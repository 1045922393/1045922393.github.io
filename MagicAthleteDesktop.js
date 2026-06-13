// ============================================
// 魔法运动员 (Magical Athlete) - 游戏核心逻辑
// 基于真实桌游规则实现
// ============================================

const CONFIG = {
    TRACK_LENGTH: 31,        // 赛道长度（0-30，共31格）
    RACES_PER_GAME: 4,       // 每局比赛场数
    PLAYERS_MIN: 2,          // 最少玩家数
    PLAYERS_MAX: 6,          // 最多玩家数
    TEAM_SIZE: 4,            // 每位玩家的队伍人数
    ATHLETES_TOTAL: 35,      // 总选手数量（已实现35个）
};

// 游戏日志折叠状态
let logCollapsed = false;

// 真实棋盘颜色配置（5色循环：粉、黄、绿、蓝、红）
const CELL_COLORS = ['#FFB6C1', '#FFE066', '#90EE90', '#87CEEB', '#FF6B6B'];
const CELL_COLORS_DARK = ['#E8A0A0', '#D4C860', '#78D078', '#6BB8D0', '#E05A5A'];

// 真实选手角色数据（基于官方规则）
const ATHLETES_DATA = [
    {
        id: 1,
        name: '炼金术士',
        skill: '炼金',
        description: '主要移动掷1/2，可改为移动4格',
        icon: '⚗️',
        effect: (roll) => (roll === 1 || roll === 2) ? { canReplace: 4 } : {}
    },
    {
        id: 2,
        name: '绊倒者',
        skill: '绊倒',
        description: '同格选手，直接绊倒（无法行动）',
        icon: '🦶',
        effect: () => ({ tripOnSameCell: true })
    },
    {
        id: 3,
        name: '香蕉',
        skill: '香蕉皮',
        description: '其他选手经过我时，将被绊倒',
        icon: '🍌',
        effect: () => ({ tripOnPass: true })
    },
    {
        id: 4,
        name: '飞艇',
        skill: '高空飞行',
        description: '在15格前主要移动+3，15格及之后主要移动-1',
        icon: '🎈',
        effect: (roll, position) => position < 15 ? { bonusMove: 3 } : { bonusMove: -1 }
    },
    {
        id: 5,
        name: '半人马',
        skill: '冲锋',
        description: '从后方超越，把对手后移2格',
        icon: '🐴',
        effect: () => ({ pushBackOnPass: 2 })
    },
    {
        id: 6,
        name: '啦啦队长',
        skill: '助威',
        description: '主要移动前，让最后的选手移动2格，我移动1格',
        icon: '📣',
        effect: () => ({ cheer: true })
    },
    {
        id: 7,
        name: '教练',
        skill: '指导',
        description: '与我同格的选手（包括自己），主要移动+1',
        icon: '📋',
        effect: () => ({ coachBuff: true })
    },
    {
        id: 8,
        name: '模范猫',
        skill: '模仿',
        description: '我拥有当前领先选手的技能',
        icon: '🐱',
        effect: () => ({ copyLeader: true })
    },
    {
        id: 9,
        name: '骰贩子',
        skill: '买卖',
        description: '每位选手每回合可重投一次，重投时我移动1格',
        icon: '🎲',
        effect: () => ({ sellReroll: true })
    },
    {
        id: 10,
        name: '决斗者',
        skill: '决斗',
        description: '同格时可决斗，各自掷骰，点数高的移动2格',
        icon: '⚔️',
        effect: () => ({ canDuel: true })
    },
    {
        id: 11,
        name: '野兔',
        skill: '疾跑',
        description: '主要移动+2；独自领先则跳过回合',
        icon: '🐰',
        effect: () => ({ bonusMove: 2, skipIfLeading: true })
    },
    {
        id: 12,
        name: '蛋',
        skill: '孵化',
        description: '比赛开始前，选择3个技能中的一个作为本次比赛技能',
        icon: '🥚',
        effect: () => ({ chooseSkill: true })
    },
    {
        id: 13,
        name: '人字拖',
        skill: '互换',
        description: '选择不移动，与任意一位交换位置',
        icon: '🩴',
        effect: () => ({ canSwap: true })
    },
    {
        id: 14,
        name: '天才预言家',
        skill: '预言',
        description: '预测自己掷骰点数，猜对则额外回合',
        icon: '🔮',
        effect: () => ({ canPredict: true })
    },
    {
        id: 15,
        name: '黏翻怪',
        skill: '黏液',
        description: '其他选手移动-1格',
        icon: '🦠',
        effect: () => ({ slowOthers: 1 })
    },
    {
        id: 16,
        name: '起哄者',
        skill: '起哄',
        description: '当选手移动≤1格时，我移动2格',
        icon: '🤡',
        effect: () => ({ heckle: true })
    },
    {
        id: 17,
        name: '巨婴',
        skill: '霸占',
        description: '没人能和我同格（除起点），经过我需2移动点',
        icon: '👶',
        effect: () => ({ blockCell: true })
    },
    {
        id: 18,
        name: '催眠师',
        skill: '催眠',
        description: '主要移动前，可传送1名选手到我所在格子',
        icon: '💫',
        effect: () => ({ canHypnotize: true })
    },
    {
        id: 19,
        name: '小蠕虫',
        skill: '蠕动',
        description: '他人掷1时跳过移动，我移1格',
        icon: '🐛',
        effect: () => ({ benefitFromOne: true })
    },
    {
        id: 20,
        name: '随从',
        skill: '跟随',
        description: '其他人主要移动掷6时，我先移动2格',
        icon: '🤴',
        effect: () => ({ followSix: true })
    },
    {
        id: 21,
        name: '跳跳蛙',
        skill: '跳跃',
        description: '移动时跳过有选手的格子',
        icon: '🐸',
        effect: () => ({ jumpOver: true })
    },
    {
        id: 22,
        name: '大长腿',
        skill: '大步',
        description: '不掷骰，直接移动5格',
        icon: '🦵',
        effect: () => ({ fixedMove: 5 })
    },
    {
        id: 23,
        name: '可爱的失败者',
        skill: '安慰',
        description: '如果单独落后，主要移动前获得1分',
        icon: '😢',
        effect: () => ({ bonusIfLast: true })
    },
    {
        id: 24,
        name: '魔术师',
        skill: '戏法',
        description: '最多两次重投骰子',
        icon: '🎩',
        effect: () => ({ rerolls: 2 })
    },
    {
        id: 25,
        name: '神机妙算',
        skill: '预测',
        description: '第一回合预测获胜选手，猜对比赛结束获第二名',
        icon: '🧠',
        effect: () => ({ predictWinner: true })
    },
    {
        id: 26,
        name: '大嘴',
        skill: '吞噬',
        description: '停在有其他人格子时淘汰他们（过半后失效）',
        icon: '👄',
        effect: () => ({ eatOnCell: true })
    },
    {
        id: 27,
        name: '派对动物',
        skill: '派对',
        description: '主要移动前所有选手向我移1格，同格每+1移动',
        icon: '🎉',
        effect: () => ({ partyTime: true })
    },
    {
        id: 28,
        name: '火箭科学家',
        skill: '推进',
        description: '可移动掷出点数2倍，但会绊倒',
        icon: '🚀',
        effect: () => ({ doubleMove: true })
    },
    {
        id: 29,
        name: '浪漫主义者',
        skill: '浪漫',
        description: '当有人停在有其他人格子时，我移动2格',
        icon: '💕',
        effect: () => ({ romanticMove: true })
    },
    {
        id: 30,
        name: '蹭蹭怪',
        skill: '蹭蹭',
        description: '其他选手技能触发时，我移动1格',
        icon: '🤗',
        effect: () => ({蹭蹭: true })
    },
    {
        id: 31,
        name: '船长',
        skill: '指挥',
        description: '当任何人掷出1时，我在回合顺序中变为下一个',
        icon: '⚓',
        effect: () => ({ captainOnOne: true })
    },
    {
        id: 32,
        name: '较真狂',
        skill: '较真',
        description: '其他选手只能精确移动冲线，过量则不移动',
        icon: '📏',
        effect: () => ({ exactFinish: true })
    },
    {
        id: 33,
        name: '吸盘鱼',
        skill: '吸附',
        description: '同格选手移动时，我可移动到他的新格子',
        icon: '🐟',
        effect: () => ({ suctionCup: true })
    },
    {
        id: 34,
        name: '第三者',
        skill: '插足',
        description: '主要移动前，传送至恰好有2名选手的格子',
        icon: '3️⃣',
        effect: () => ({ teleportToPair: true })
    },
    {
        id: 35,
        name: '双胞胎',
        skill: '复制',
        description: '可选择上一场比赛获胜者的技能',
        icon: '👯',
        effect: () => ({ copyPreviousWinner: true })
    }
];

// 赛道类型
const TRACK_TYPES = {
    GENTLE: '温和赛道',   // 基础赛道
    WILD: '狂野赛道'      // 进阶赛道（含障碍物）
};

// 游戏状态
let gameState = {
    phase: 'setup',          // setup, draft, race, end
    players: [],
    currentRace: 1,
    currentRaceOrder: [],    // 当前比赛的行动顺序
    currentTurn: 0,          // 当前行动的玩家索引
    track: [],
    athletesDeck: [],        // 选手牌堆
    goldTokens: [],          // 金色奖杯
    silverTokens: [],        // 银色奖牌
    selectedAthletes: [],    // 当前比赛中选手的选手
    raceFinished: false,
    finishOrder: []          // 完赛顺序
};

// Canvas 和 UI 相关
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 响应式 Canvas
function resizeCanvas() {
    const container = document.getElementById('gameContainer');
    const maxWidth = Math.min(container.clientWidth - 20, 1400);
    const maxHeight = Math.min(container.clientHeight - 20, 900);
    
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    
    if (gameState.phase !== 'setup') {
        drawGame();
    }
}

window.addEventListener('resize', resizeCanvas);

// ============================================
// 游戏初始化
// ============================================

function initGame(playerCount) {
    gameState.phase = 'draft';
    gameState.players = [];
    gameState.currentRace = 1;
    gameState.finishOrder = [];
    
    // 创建玩家
    for (let i = 0; i < playerCount; i++) {
        gameState.players.push({
            id: i,
            name: `玩家 ${i + 1}`,
            color: getPlayerColor(i),
            team: [],           // 队伍（4名选手）
            score: 0,           // 总分
            usedAthletes: []    // 已使用的选手
        });
    }
    
    // 初始化选手牌堆
    gameState.athletesDeck = shuffleArray([...ATHLETES_DATA]);
    
    // 初始化奖杯奖牌
    initTokens();
    
    // 初始化赛道
    initTrack();
    
    // 开始选角阶段
    startDraft();
}

function getPlayerColor(index) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    return colors[index % colors.length];
}

function initTokens() {
    gameState.goldTokens = [];
    gameState.silverTokens = [];
    
    // 4场比赛，每场1金1银
    for (let i = 0; i < CONFIG.RACES_PER_GAME; i++) {
        gameState.goldTokens.push({ race: i + 1, points: 5 - i });  // 第1场5分，递减
        gameState.silverTokens.push({ race: i + 1, points: 3 - Math.floor(i / 2) });
    }
}

function initTrack() {
    gameState.track = [];
    
    for (let i = 0; i < CONFIG.TRACK_LENGTH; i++) {
        gameState.track.push({
            index: i,
            type: i === 0 ? 'start' : i === CONFIG.TRACK_LENGTH - 1 ? 'finish' : 'normal',
            athletes: []  // 该格子的选手
        });
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ============================================
// 选角阶段（蛇形选将）
// ============================================

function startDraft() {
    const playerCount = gameState.players.length;
    const cardsToReveal = playerCount * 2;  // 翻开玩家数量2倍的选手牌
    
    gameState.draftPool = gameState.athletesDeck.splice(0, cardsToReveal);
    gameState.draftOrder = createDraftOrder(playerCount);
    gameState.currentDraftPick = 0;
    gameState.draftRound = 1;
    
    updateUI();
    drawGame();
    addLog(`选角开始！翻开 ${cardsToReveal} 张选手牌`);
}

function createDraftOrder(playerCount) {
    // 蛇形选将：1,2,3,4,4,3,2,1,1,2,3,4...
    const order = [];
    const rounds = CONFIG.TEAM_SIZE;
    
    for (let round = 0; round < rounds; round++) {
        if (round % 2 === 0) {
            // 正向：0,1,2,3
            for (let i = 0; i < playerCount; i++) {
                order.push(i);
            }
        } else {
            // 反向：3,2,1,0
            for (let i = playerCount - 1; i >= 0; i--) {
                order.push(i);
            }
        }
    }
    
    return order;
}

function selectAthlete(playerIndex, athleteId) {
    const player = gameState.players[playerIndex];
    const athleteIndex = gameState.draftPool.findIndex(a => a.id === athleteId);
    
    if (athleteIndex === -1) {
        addLog('该选手已被选择！');
        return false;
    }
    
    const athlete = gameState.draftPool.splice(athleteIndex, 1)[0];
    player.team.push({ ...athlete, used: false });
    
    addLog(`${player.name} 选择了 ${athlete.icon} ${athlete.name}`);
    
    gameState.currentDraftPick++;
    
    // 检查是否需要补充牌池
    if (gameState.draftPool.length < gameState.players.length && 
        gameState.athletesDeck.length > 0) {
        const needed = gameState.players.length - gameState.draftPool.length;
        const newCards = gameState.athletesDeck.splice(0, needed);
        gameState.draftPool.push(...newCards);
        addLog(`补充 ${needed} 张选手牌到牌池`);
    }
    
    // 检查选角是否结束
    if (gameState.currentDraftPick >= gameState.draftOrder.length) {
        finishDraft();
    } else {
        updateUI();
        drawGame();
    }
    
    return true;
}

function finishDraft() {
    addLog('=== 选角结束！===');
    
    gameState.players.forEach(player => {
        const teamNames = player.team.map(a => `${a.icon}${a.name}`).join(', ');
        addLog(`${player.name} 的队伍：${teamNames}`);
    });
    
    gameState.phase = 'race';
    startRace();
}

// ============================================
// 比赛阶段
// ============================================

function startRace() {
    addLog(`\n=== 第 ${gameState.currentRace} 场比赛开始！===`);
    
    gameState.selectedAthletes = [];
    gameState.finishOrder = [];
    gameState.raceFinished = false;
    
    // 重置赛道
    gameState.track.forEach(cell => cell.athletes = []);
    
    // 每位玩家选择一名选手参赛
    // 这里简化为自动选择未使用的第一张牌
    // TODO: 实现玩家手动选择
    selectAthletesForRace();
}

function selectAthletesForRace() {
    gameState.players.forEach((player, playerIndex) => {
        // 找到第一个未使用的选手
        const availableAthlete = player.team.find(a => !a.used);
        
        if (availableAthlete) {
            availableAthlete.used = true;
            player.usedAthletes.push(availableAthlete.id);
            
            const raceAthlete = {
                ...availableAthlete,
                playerIndex: playerIndex,
                playerName: player.name,
                playerColor: player.color,
                position: 0,
                hasJumped: false,
                skipped: false
            };
            
            gameState.selectedAthletes.push(raceAthlete);
            gameState.track[0].athletes.push(raceAthlete);
            
            addLog(`${player.name} 派出 ${availableAthlete.icon} ${availableAthlete.name} 参赛`);
        }
    });
    
    // 决定先手顺序
    determineTurnOrder();
}

// 回合状态机（全局变量）
let turnState = 'idle';  // prepare, roll, move, end
let currentAthleteIndex = -1;  // 当前回合选手索引
let selectedPieceIndex = -1;   // 选中的棋子索引
let currentRollValue = 0;
let canUseSkill = false;
let diceRolled = false;

// 技能使用函数（占位）
function useSkill() {
    if (!canUseSkill || currentAthleteIndex < 0) return;
    const athlete = gameState.selectedAthletes[currentAthleteIndex];
    addLog(`${athlete.playerName} 使用技能: ${athlete.skillName}`);
    canUseSkill = false;
    updateUI();
}

function determineTurnOrder() {
    // 掷骰决定先手
    const rolls = gameState.selectedAthletes.map((athlete, idx) => ({
        index: idx,
        roll: Math.floor(Math.random() * 6) + 1
    }));
    
    rolls.sort((a, b) => b.roll - a.roll);
    
    gameState.currentRaceOrder = rolls.map(r => r.index);
    gameState.currentTurn = 0;
    
    addLog(`掷骰决定先手：${rolls.map(r => `${gameState.selectedAthletes[r.index].playerName}(${r.roll})`).join(' > ')}`);
    
    updateUI();
    drawGame();
    
    // 进入第一个玩家的回合（等待手动操作）
    startTurn();
}

function startTurn() {
    const raceOrderIdx = gameState.currentRaceOrder[gameState.currentTurn];
    const athlete = gameState.selectedAthletes[raceOrderIdx];
    
    if (athlete.skipped) {
        addLog(`${athlete.playerName} 的 ${athlete.name} 被暂停一回合！`);
        athlete.skipped = false;
        nextTurn();
        return;
    }
    
    // 新回合制：从准备阶段开始
    currentAthleteIndex = raceOrderIdx;
    turnState = 'prepare';
    selectedPieceIndex = -1;
    canUseSkill = false;
    diceRolled = false;
    currentRollValue = 0;
    
    addLog(`=== ${athlete.playerName} 的 ${athlete.icon} ${athlete.name} 回合 ===`);
    addLog('📋 准备阶段：可发动技能，任意移动棋子');
    updateUI();
    drawGame();
}

// 手动掷骰子
function manualRollDice() {
    if (turnState !== 'roll' || gameState.phase !== 'race') return;
    if (currentAthleteIndex < 0) return;
    
    const athlete = gameState.selectedAthletes[currentAthleteIndex];
    
    // 大长腿不掷骰，直接设置移动值
    if (athlete.fixedMove) {
        addLog(`${athlete.name} 的【${athlete.skill}】发动！直接前进5格`);
        currentRollValue = 5;
        diceRolled = true;
        addLog(`⬇️ 点击"进入移动"阶段`);
        updateUI();
        drawGame();
        return;
    }
    
    // 掷骰
    let roll = Math.floor(Math.random() * 6) + 1;
    currentRollValue = roll;
    
    // 处理技能
    const skillResult = processSkill(athlete, roll, gameState.selectedAthletes);
    let actualMove = roll;
    
    if (skillResult.canReplace && (roll === 1 || roll === 2)) {
        actualMove = skillResult.canReplace;
        addLog(`${athlete.name} 的【${athlete.skill}】发动！${roll}→${actualMove}格`);
    } else if (skillResult.bonusMove !== undefined && skillResult.bonusMove !== false) {
        actualMove += skillResult.bonusMove;
        if (skillResult.bonusMove > 0) {
            addLog(`${athlete.name} 的【${athlete.skill}】发动！+${skillResult.bonusMove}格`);
        } else if (skillResult.bonusMove < 0) {
            addLog(`${athlete.name} 的【${athlete.skill}】发动！${skillResult.bonusMove}格`);
        }
    } else if (skillResult.replaceMove) {
        actualMove = skillResult.replaceMove;
        addLog(`${athlete.name} 的【${athlete.skill}】发动！`);
    } else {
        addLog(`🎲 ${athlete.playerName} 掷出 ${roll}`);
    }
    
    diceRolled = true;
    currentRollValue = actualMove;
    
    addLog(`⬇️ 前进 ${actualMove} 格，点击"进入移动"阶段`);
    updateUI();
    drawGame();
}

// 手动点击棋子移动
function manualMove(athleteIndex) {
    if (turnState !== 'move') return;
    if (athleteIndex !== currentAthleteIndex) {
        addLog('请点击当前行动的选手棋子！');
        return;
    }
    
    moveAthlete(currentAthleteIndex, currentRollValue);
    
    const athlete = gameState.selectedAthletes[currentAthleteIndex];
    
    if (athlete.position >= CONFIG.TRACK_LENGTH - 1) {
        handleFinish(currentAthleteIndex);
    }
    
    turnState = 'end';
    updateUI();
    drawGame();
}

function processSkill(athlete, roll, allAthletes) {
    if (!athlete.effect) return {};
    
    try {
        // 传入当前位和所有选手信息
        return athlete.effect(roll, athlete.position, allAthletes);
    } catch (e) {
        // 部分技能需要复杂处理
        return {};
    }
}

function isLastPlace(athlete) {
    const positions = gameState.selectedAthletes.map(a => a.position);
    return athlete.position === Math.min(...positions);
}

function moveAthlete(athleteIndex, steps) {
    const athlete = gameState.selectedAthletes[athleteIndex];
    
    // 从当前格子移除
    const oldCell = gameState.track[athlete.position];
    oldCell.athletes = oldCell.athletes.filter(a => a.id !== athlete.id);
    
    // 移动到新位置
    const newPosition = Math.min(athlete.position + steps, CONFIG.TRACK_LENGTH - 1);
    athlete.position = newPosition;
    
    // 添加到新格子
    gameState.track[newPosition].athletes.push(athlete);
    
    addLog(`${athlete.name} 移动到第 ${newPosition + 1} 格`);
    
    // 处理格子上的交互
    handleCellInteraction(athlete);
    
    drawGame();
}

function handleCellInteraction(athlete) {
    const cell = gameState.track[athlete.position];
    
    // 检查同格其他选手
    const othersOnCell = cell.athletes.filter(a => a.id !== athlete.id);
    
    othersOnCell.forEach(other => {
        // 盗贼技能：推后
        if (athlete.name === '盗贼' && !other.immune) {
            pushBack(other, 2);
            addLog(`${athlete.name} 的【偷袭】发动！${other.name} 后退2格`);
        }
    });
}

function pushBack(athlete, steps) {
    const oldCell = gameState.track[athlete.position];
    oldCell.athletes = oldCell.athletes.filter(a => a.id !== athlete.id);
    
    athlete.position = Math.max(0, athlete.position - steps);
    
    gameState.track[athlete.position].athletes.push(athlete);
}

function handleFinish(athleteIndex) {
    const athlete = gameState.selectedAthletes[athleteIndex];
    
    gameState.finishOrder.push(athleteIndex);
    
    const rank = gameState.finishOrder.length;
    addLog(`🏆 ${athlete.playerName} 的 ${athlete.name} 获得第 ${rank} 名！`);
    
    if (rank === 1) {
        // 第一名：金色奖杯
        const gold = gameState.goldTokens.shift();
        gameState.players[athlete.playerIndex].score += gold.points;
        addLog(`获得金色奖杯 +${gold.points}分！`);
    } else if (rank === 2) {
        // 第二名：银色奖牌
        const silver = gameState.silverTokens.shift();
        gameState.players[athlete.playerIndex].score += silver.points;
        addLog(`获得银色奖牌 +${silver.points}分！`);
    }
    
    // 检查比赛是否结束
    if (gameState.finishOrder.length >= 2) {
        finishRace();
    } else {
        nextTurn();
    }
}

// 结束当前回合
function endCurrentTurn() {
    turnState = 'idle';
    diceRolled = false;
    canUseSkill = false;
    currentRollValue = 0;
    selectedPieceIndex = -1;
    nextTurn();
}

function nextTurn() {
    gameState.currentTurn = (gameState.currentTurn + 1) % gameState.currentRaceOrder.length;
    
    // 跳过已完赛的选手
    let attempts = 0;
    while (gameState.finishOrder.includes(gameState.currentRaceOrder[gameState.currentTurn]) && 
           attempts < gameState.selectedAthletes.length) {
        gameState.currentTurn = (gameState.currentTurn + 1) % gameState.currentRaceOrder.length;
        attempts++;
    }
    
    if (attempts >= gameState.selectedAthletes.length || gameState.finishOrder.length >= 2) {
        if (!gameState.raceFinished) {
            finishRace();
        }
        return;
    }
    
    setTimeout(() => startTurn(), 1000);
}

function finishRace() {
    gameState.raceFinished = true;
    
    addLog(`=== 第 ${gameState.currentRace} 场比赛结束！===`);
    
    // 显示当前分数
    const scores = gameState.players
        .map(p => `${p.name}: ${p.score}分`)
        .join(' | ');
    addLog(`当前分数：${scores}`);
    
    gameState.currentRace++;
    
    // 检查游戏是否结束
    if (gameState.currentRace > CONFIG.RACES_PER_GAME) {
        endGame();
    } else {
        // 准备下一场比赛
        setTimeout(() => {
            startRace();
        }, 2000);
    }
}

function endGame() {
    gameState.phase = 'end';
    
    addLog('\n🏆🏆🏆 游戏结束！最终排名：🏆🏆🏆');
    
    const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
    
    sortedPlayers.forEach((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
        addLog(`${medal} ${index + 1}. ${player.name} - ${player.score}分`);
    });
    
    const winner = sortedPlayers[0];
    alert(`🎉 ${winner.name} 获得冠军！总分：${winner.score}分`);
    
    updateUI();
    drawGame();
}

// ============================================
// 绘制游戏
// ============================================

function drawGame() {
    try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        switch (gameState.phase) {
            case 'draft':
                drawDraftPhase();
                break;
            case 'race':
                drawRacePhase();
                break;
            case 'end':
                drawRacePhase();
                drawEndScreen();
                break;
        }
    } catch(e) {
        console.error('drawGame error:', e.message, e.stack);
        ctx.fillStyle = '#F00';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('渲染错误: ' + e.message, canvas.width / 2, canvas.height / 2);
    }
}

function drawDraftPhase() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // 绘制标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('选角阶段', centerX, 50);
    
    // 绘制可选选手牌池
    if (gameState.draftPool && gameState.draftPool.length > 0) {
        const cardWidth = 120;
        const cardHeight = 150;
        const spacing = 20;
        const totalWidth = gameState.draftPool.length * (cardWidth + spacing) - spacing;
        const startX = (canvas.width - totalWidth) / 2;
        
        gameState.draftPool.forEach((athlete, index) => {
            const x = startX + index * (cardWidth + spacing);
            const y = 100;
            
            drawAthleteCard(athlete, x, y, cardWidth, cardHeight, index);
        });
    }
    
    // 绘制各玩家队伍
    const teamY = 300;
    const teamWidth = (canvas.width - 100) / gameState.players.length;
    
    gameState.players.forEach((player, playerIndex) => {
        const x = 50 + playerIndex * teamWidth;
        
        // 玩家名称
        ctx.fillStyle = player.color;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, x + teamWidth / 2, teamY);
        
        // 已选选手
        player.team.forEach((athlete, idx) => {
            const cardX = x + idx * 80;
            const cardY = teamY + 20;
            drawMiniAthleteCard(athlete, cardX, cardY, 70, 90);
        });
    });
    
    // 提示当前选择玩家
    if (gameState.draftOrder && gameState.currentDraftPick < gameState.draftOrder.length) {
        const currentPlayerIndex = gameState.draftOrder[gameState.currentDraftPick];
        ctx.fillStyle = '#FF6B6B';
        ctx.font = '18px Arial';
        ctx.fillText(`轮到 ${gameState.players[currentPlayerIndex].name} 选择`, centerX, canvas.height - 30);
    }
}

function drawAthleteCard(athlete, x, y, width, height, index) {
    // 卡牌背景
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // 图标
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(athlete.icon, x + width / 2, y + 50);
    
    // 名称
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(athlete.name, x + width / 2, y + 75);
    
    // 技能
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(athlete.skill, x + width / 2, y + 95);
    
    // 描述（换行）
    const words = athlete.description.split('');
    let line = '';
    let lineY = y + 115;
    
    words.forEach((char, idx) => {
        line += char;
        if (line.length >= 8 || idx === words.length - 1) {
            ctx.fillText(line, x + width / 2, lineY);
            line = '';
            lineY += 14;
        }
    });
    
    // 点击区域标记
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.fillRect(x, y, width, height);
}

function drawMiniAthleteCard(athlete, x, y, width, height) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(athlete.icon, x + width / 2, y + 40);
    
    ctx.font = '10px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(athlete.name, x + width / 2, y + 60);
}

function drawRacePhase() {
    // 口形环形赛道：0~30，共31格
    // 上行 0→10（左到右，11格）
    // 右列 11→15（上到下，5格）
    // 下行 16→25（右到左，10格）  注意：25是拐角，下行含25
    // 左列 26→30（下到上，5格）
    // 终点=31(在30之后/与30同位置显示)
    
    const padding = 15;
    const titleHeight = 45;
    const listHeight = 60;
    const gap = 4; // 格子间距
    
    // 各段格子数
    const topN = 11;    // 0-10
    const rightN = 5;   // 11-15
    const bottomN = 10; // 16-25
    const leftN = 5;    // 26-30
    
    // 正方形格子尺寸
    const availableW = canvas.width - padding * 2;
    const cellSize = Math.floor((availableW - gap) / (topN + 1)); // +1给右列
    if (cellSize < 20) return;
    
    // 计算各段位置
    const topRowWidth = topN * cellSize + (topN - 1) * gap;
    const rightColX = padding + topRowWidth + gap;
    const bottomRowWidth = (bottomN) * cellSize + (bottomN - 1) * gap;
    const leftColX = padding;
    
    const rightColH = rightN * cellSize + (rightN - 1) * gap;
    const leftColH = leftN * cellSize + (leftN - 1) * gap;
    
    const trackStartY = titleHeight + 8;
    const bottomY = trackStartY + cellSize + gap + rightColH + gap;
    const leftColY = bottomY;
    
    function getCellPos(index) {
        if (index <= 10) {
            // 上行 0-10 左→右
            return { x: padding + index * (cellSize + gap), y: trackStartY, row: 'top' };
        } else if (index <= 15) {
            // 右列 11-15 上→下
            return { x: rightColX, y: trackStartY + cellSize + gap + (index - 11) * (cellSize + gap), row: 'right' };
        } else if (index <= 25) {
            // 下行 16-25 右→左
            const c = index - 16;
            return { x: rightColX - (c + 1) * (cellSize + gap), y: bottomY, row: 'bottom' };
        } else {
            // 左列 26-30 下→上
            const c = index - 26;
            return { x: leftColX, y: bottomY - (c + 1) * (cellSize + gap), row: 'left' };
        }
    }
    
    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 第 ' + gameState.currentRace + ' 场比赛', canvas.width / 2, 35);
    
    // 赛道背景
    const minX = padding - 6;
    const minY = trackStartY - 6;
    const maxX = rightColX + cellSize + 6;
    const maxY = bottomY + cellSize + 6;
    ctx.fillStyle = '#3a3a4a';
    roundRect(ctx, minX, minY, maxX - minX, maxY - minY, 12);
    ctx.fill();
    
    // 绘制31个格子
    gameState.track.forEach((cell, index) => {
        const pos = getCellPos(index);
        const isDark = (pos.row === 'right' || pos.row === 'bottom');
        
        // 格子颜色
        const colorIndex = index % CELL_COLORS.length;
        ctx.fillStyle = isDark ? CELL_COLORS_DARK[colorIndex] : CELL_COLORS[colorIndex];
        roundRect(ctx, pos.x, pos.y, cellSize, cellSize, 6);
        ctx.fill();
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // 格子编号
        const fontSize = Math.min(Math.floor(cellSize * 0.32), 14);
        if (index % 5 === 0 || index <= 2 || index >= 28) {
            ctx.fillStyle = isDark ? '#FFF' : '#C0392B';
            ctx.font = 'bold ' + fontSize + 'px Arial';
        } else {
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)';
            ctx.font = Math.max(fontSize - 4, 8) + 'px Arial';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(index), pos.x + cellSize / 2, pos.y + cellSize / 2);
        
        // 起点/终点标记
        if (index === 0) {
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold ' + Math.max(9, Math.floor(cellSize * 0.18)) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('起点', pos.x + cellSize / 2, pos.y + cellSize - 7);
        }
        if (index === CONFIG.TRACK_LENGTH - 1) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold ' + Math.max(9, Math.floor(cellSize * 0.18)) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('终点', pos.x + cellSize / 2, pos.y + cellSize - 7);
        }
        
        // 格子上的选手 - 棋子大小为格子的1/4（直径=cellSize/2）
        if (cell.athletes && cell.athletes.length > 0) {
            const count = cell.athletes.length;
            // 棋子半径 = 格子的1/4
            const pieceRadius = Math.max(cellSize / 4, 8);
            // 网格布局
            let cols, rows;
            if (count === 1) { cols = 1; rows = 1; }
            else if (count === 2) { cols = 2; rows = 1; }
            else if (count <= 4) { cols = 2; rows = Math.ceil(count / 2); }
            else { cols = 3; rows = Math.ceil(count / 3); }
            
            const gridW = cols * pieceRadius * 2 + (cols - 1) * 2;
            const gridH = rows * pieceRadius * 2 + (rows - 1) * 2;
            const startX = pos.x + (cellSize - gridW) / 2 + pieceRadius;
            const startY = pos.y + (cellSize - gridH) / 2 + pieceRadius;
            
            cell.athletes.forEach((athlete, idx) => {
                const col = idx % cols;
                const row = Math.floor(idx / cols);
                const ax = startX + col * (pieceRadius * 2 + 2);
                const ay = startY + row * (pieceRadius * 2 + 2);
                
                const isCurrentTurn = (currentAthleteIndex >= 0 && 
                    gameState.selectedAthletes[currentAthleteIndex] === athlete);
                const isSelected = (selectedPieceIndex >= 0 && 
                    gameState.selectedAthletes[selectedPieceIndex] === athlete);
                
                // 棋子圆形 - 半径为格子1/4
                ctx.beginPath();
                ctx.arc(ax, ay, pieceRadius, 0, Math.PI * 2);
                ctx.fillStyle = athlete.playerColor;
                ctx.fill();
                ctx.strokeStyle = isCurrentTurn ? '#FFD700' : '#222';
                ctx.lineWidth = isCurrentTurn ? 3 : 1.5;
                ctx.stroke();
                
                // 当前回合发光效果
                if (isCurrentTurn) {
                    ctx.beginPath();
                    ctx.arc(ax, ay, pieceRadius + 4, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255,215,0,0.6)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                // 选中高亮效果
                if (isSelected) {
                    ctx.beginPath();
                    ctx.arc(ax, ay, pieceRadius + 6, 0, Math.PI * 2);
                    ctx.strokeStyle = '#00FF00';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(ax, ay, pieceRadius + 10, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(0,255,0,0.3)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                
                // 图标 - 根据棋子大小自适应
                const iconFont = Math.max(pieceRadius * 0.9, 10);
                ctx.font = 'bold ' + iconFont + 'px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(athlete.icon, ax, ay);
            });
        }
    });
    
    // ===== 中央信息区域（口形内部）- 缩小版，显示技能和阶段 =====
    const centerX = padding + (rightColX + cellSize - padding) / 2;
    const centerY = trackStartY + (bottomY - trackStartY + cellSize) / 2;
    const innerW = Math.min(rightColX - padding - 40, 280); // 限制最大宽度
    const innerH = Math.min(bottomY - trackStartY - 20, 180); // 限制最大高度
    
    // 中央背景
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    roundRect(ctx, centerX - innerW / 2, centerY - innerH / 2, innerW, innerH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,215,0,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 当前回合选手信息
    if (currentAthleteIndex >= 0 && currentAthleteIndex < gameState.selectedAthletes.length) {
        const cur = gameState.selectedAthletes[currentAthleteIndex];
        const nameFont = Math.min(Math.floor(innerH * 0.18), 20);
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold ' + nameFont + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cur.icon + ' ' + cur.name, centerX, centerY - innerH * 0.3);
        
        // 技能描述
        ctx.fillStyle = '#FFF';
        ctx.font = Math.min(Math.floor(innerH * 0.12), 14) + 'px Arial';
        const skillText = cur.skill + ': ' + cur.description;
        // 换行处理
        const maxWidth = innerW - 20;
        const words = skillText.split('');
        let line = '';
        let lines = [];
        for (let w of words) {
            const testLine = line + w;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== '') {
                lines.push(line);
                line = w;
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        
        let lineY = centerY - innerH * 0.08;
        for (let l of lines.slice(0, 3)) { // 最多3行
            ctx.fillText(l, centerX, lineY);
            lineY += nameFont * 0.9;
        }
        
        // 阶段和骰子信息
        const infoFont = Math.min(Math.floor(innerH * 0.14), 16);
        ctx.font = 'bold ' + infoFont + 'px Arial';
        
        if (turnState === 'prepare') {
            ctx.fillStyle = '#90EE90';
            ctx.fillText('📋 准备阶段', centerX, centerY + innerH * 0.25);
            ctx.fillStyle = '#AAA';
            ctx.font = Math.max(infoFont * 0.7, 11) + 'px Arial';
            ctx.fillText('可发动技能，任意移动棋子', centerX, centerY + innerH * 0.4);
        } else if (turnState === 'roll') {
            ctx.fillStyle = '#87CEEB';
            ctx.fillText('🎲 投掷阶段', centerX, centerY + innerH * 0.25);
            if (diceRolled) {
                ctx.fillStyle = '#FFF';
                ctx.font = 'bold ' + Math.min(infoFont * 1.2, 22) + 'px Arial';
                ctx.fillText('点数: ' + currentRollValue, centerX, centerY + innerH * 0.42);
            }
        } else if (turnState === 'move') {
            ctx.fillStyle = '#FFE066';
            ctx.fillText('🏃 移动阶段', centerX, centerY + innerH * 0.25);
            if (diceRolled) {
                ctx.fillStyle = '#FFF';
                ctx.font = 'bold ' + Math.min(infoFont, 14) + 'px Arial';
                ctx.fillText('骰子: ' + currentRollValue + ' | 可移动 ' + currentRollValue + ' 格', centerX, centerY + innerH * 0.4);
            }
        } else if (turnState === 'end') {
            ctx.fillStyle = '#FF6B6B';
            ctx.fillText('⏭️ 结束阶段', centerX, centerY + innerH * 0.25);
            ctx.fillStyle = '#AAA';
            ctx.font = Math.max(infoFont * 0.7, 11) + 'px Arial';
            ctx.fillText('可调整位置，点击结束回合', centerX, centerY + innerH * 0.4);
        }
    }
    
    // 参赛选手列表
    const listY = bottomY + cellSize + 14;
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('参赛选手', padding, listY);
    
    const cardW = Math.min(120, (canvas.width - padding * 2) / gameState.selectedAthletes.length - 4);
    gameState.selectedAthletes.forEach((athlete, index) => {
        const x = padding + index * (cardW + 4);
        const y = listY + 8;
        ctx.fillStyle = athlete.playerColor;
        roundRect(ctx, x, y, cardW, 30, 5);
        ctx.fill();
        ctx.fillStyle = '#FFF';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(athlete.icon + ' ' + athlete.name, x + 5, y + 15);
        ctx.font = '8px Arial';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText('#' + (athlete.position + 1), x + cardW - 5, y + 15);
    });
}

// 绘制圆角矩形辅助函数
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function drawEndScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 游戏结束！', canvas.width / 2, canvas.height / 2 - 80);
    
    const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
    
    sortedPlayers.forEach((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
        
        ctx.fillStyle = index === 0 ? '#FFD700' : '#FFF';
        ctx.font = '24px Arial';
        ctx.fillText(`${medal} ${index + 1}. ${player.name} - ${player.score}分`, 
                     canvas.width / 2, canvas.height / 2 - 20 + index * 40);
    });
}

// ============================================
// UI 更新
// ============================================

function updateUI() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        // 高亮当前行动玩家
        if (gameState.phase === 'race' && currentAthleteIndex >= 0) {
            const currentAthlete = gameState.selectedAthletes[currentAthleteIndex];
            if (currentAthlete && currentAthlete.playerIndex === index) {
                card.style.border = '3px solid #FFD700';
                card.style.boxShadow = '0 0 10px rgba(255,215,0,0.6)';
            }
        }
        
        card.innerHTML = `
            <div class="player-token" style="background: ${player.color}"></div>
            <div>
                <strong>${player.name}</strong>
                <br>
                <small>分数: ${player.score}</small>
                <br>
                <small>队伍: ${player.team.length}/4</small>
            </div>
        `;
        
        playerList.appendChild(card);
    });
    
    // 更新按钮状态 - 四阶段回合制
    const rollBtn = document.getElementById('rollDice');
    const endBtn = document.getElementById('endTurn');
    
    if (gameState.phase !== 'race') {
        rollBtn.style.display = 'none';
        endBtn.style.display = 'none';
        return;
    }
    
    rollBtn.style.display = 'inline-block';
    endBtn.style.display = 'inline-block';
    
    // 根据当前阶段设置按钮
    if (turnState === 'prepare') {
        rollBtn.textContent = '🎲 进入投掷 [空格]';
        rollBtn.disabled = false;
        rollBtn.onclick = () => {
            turnState = 'roll';
            addLog('🎲 进入投掷阶段，按空格掷骰子');
            updateUI();
            drawGame();
        };
        endBtn.textContent = '⏭️ 结束回合 [回车]';
        endBtn.disabled = true;
    } else if (turnState === 'roll') {
        rollBtn.textContent = '🎲 掷骰子 [空格]';
        rollBtn.disabled = diceRolled;
        rollBtn.onclick = manualRollDice;
        endBtn.textContent = diceRolled ? '⏭️ 进入移动 [回车]' : '⏭️ 结束回合 [回车]';
        endBtn.disabled = !diceRolled;
        endBtn.onclick = () => {
            turnState = 'move';
            addLog('🏃 进入移动阶段，根据骰子点数移动棋子');
            updateUI();
            drawGame();
        };
    } else if (turnState === 'move') {
        rollBtn.textContent = '🎲 已掷: ' + currentRollValue;
        rollBtn.disabled = true;
        endBtn.textContent = '⏭️ 进入结束 [回车]';
        endBtn.disabled = false;
        endBtn.onclick = () => {
            turnState = 'end';
            addLog('⏭️ 进入结束阶段，可调整位置后结束回合');
            updateUI();
            drawGame();
        };
    } else if (turnState === 'end') {
        rollBtn.textContent = '🎲 回合结束';
        rollBtn.disabled = true;
        endBtn.textContent = '⏭️ 结束回合 [回车]';
        endBtn.disabled = false;
        endBtn.onclick = endCurrentTurn;
    } else {
        rollBtn.textContent = '🎲 掷骰子';
        rollBtn.disabled = true;
        endBtn.textContent = '⏭️ 结束回合';
        endBtn.disabled = true;
    }
}

function addLog(message) {
    const logContent = document.getElementById('logContent');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
}

// ============================================
// Canvas 点击事件
// ============================================

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (gameState.phase === 'draft') {
        // 选角阶段：点击选手牌
        handleDraftClick(x, y);
    } else if (gameState.phase === 'race' || gameState.phase === 'end') {
        // 比赛阶段：点击棋子移动
        handleRaceClick(x, y);
    }
});

function handleDraftClick(x, y) {
    if (!gameState.draftPool || gameState.draftPool.length === 0) return;
    
    const cardWidth = 120;
    const cardHeight = 150;
    const spacing = 20;
    const totalWidth = gameState.draftPool.length * (cardWidth + spacing) - spacing;
    const startX = (canvas.width - totalWidth) / 2;
    
    gameState.draftPool.forEach((athlete, index) => {
        const cardX = startX + index * (cardWidth + spacing);
        const cardY = 100;
        
        if (x >= cardX && x <= cardX + cardWidth && y >= cardY && y <= cardY + cardHeight) {
            const currentPlayerIndex = gameState.draftOrder[gameState.currentDraftPick];
            selectAthlete(currentPlayerIndex, athlete.id);
        }
    });
}

function handleRaceClick(x, y) {
    // 与 drawRacePhase 相同的口形布局参数
    const padding = 15;
    const titleHeight = 45;
    const gap = 4;
    
    const topN = 11;
    const rightN = 5;
    const bottomN = 10;
    const leftN = 5;
    
    const availableW = canvas.width - padding * 2;
    const cellSize = Math.floor((availableW - gap) / (topN + 1));
    const pieceRadius = Math.max(cellSize / 4, 8);
    
    const topRowWidth = topN * cellSize + (topN - 1) * gap;
    const rightColX = padding + topRowWidth + gap;
    const rightColH = rightN * cellSize + (rightN - 1) * gap;
    const trackStartY = titleHeight + 8;
    const bottomY = trackStartY + cellSize + gap + rightColH + gap;
    const leftColX = padding;
    
    function getCellPos(index) {
        if (index <= 10) return { x: padding + index * (cellSize + gap), y: trackStartY, w: cellSize, h: cellSize };
        else if (index <= 15) return { x: rightColX, y: trackStartY + cellSize + gap + (index - 11) * (cellSize + gap), w: cellSize, h: cellSize };
        else if (index <= 25) { const c = index - 16; return { x: rightColX - (c + 1) * (cellSize + gap), y: bottomY, w: cellSize, h: cellSize }; }
        else { const c = index - 26; return { x: leftColX, y: bottomY - (c + 1) * (cellSize + gap), w: cellSize, h: cellSize }; }
    }
    
    function getPiecePositions(cellIndex, athleteCount) {
        const pos = getCellPos(cellIndex);
        let cols, rows;
        if (athleteCount === 1) { cols = 1; rows = 1; }
        else if (athleteCount === 2) { cols = 2; rows = 1; }
        else if (athleteCount <= 4) { cols = 2; rows = Math.ceil(athleteCount / 2); }
        else { cols = 3; rows = Math.ceil(athleteCount / 3); }
        
        const gridW = cols * pieceRadius * 2 + (cols - 1) * 2;
        const gridH = rows * pieceRadius * 2 + (rows - 1) * 2;
        const startX = pos.x + (cellSize - gridW) / 2 + pieceRadius;
        const startY = pos.y + (cellSize - gridH) / 2 + pieceRadius;
        
        const positions = [];
        for (let a = 0; a < athleteCount; a++) {
            const col = a % cols;
            const row = Math.floor(a / cols);
            positions.push({ x: startX + col * (pieceRadius * 2 + 2), y: startY + row * (pieceRadius * 2 + 2) });
        }
        return positions;
    }
    
    // ===== 检测点击棋子（圆形检测）=====
    for (let i = 0; i < gameState.selectedAthletes.length; i++) {
        const athlete = gameState.selectedAthletes[i];
        const cell = gameState.track[athlete.position];
        const count = cell.athletes ? cell.athletes.length : 1;
        const positions = getPiecePositions(athlete.position, count);
        const athleteIdxInCell = cell.athletes ? cell.athletes.indexOf(athlete) : 0;
        const pp = positions[athleteIdxInCell >= 0 ? athleteIdxInCell : 0];
        if (!pp) continue;
        
        const dist = Math.sqrt((x - pp.x) ** 2 + (y - pp.y) ** 2);
        if (dist <= pieceRadius + 5) {
            // 准备阶段和结束阶段：任意棋子可点击选择用于移动
            if (turnState === 'prepare' || turnState === 'end') {
                selectedPieceIndex = i;
                addLog('选中: ' + athlete.icon + athlete.name + '（位置 ' + athlete.position + '）- 点击格子移动');
                drawGame();
                return;
            }
            // 移动阶段：只能选当前回合选手
            else if (turnState === 'move' && i === currentAthleteIndex) {
                selectedPieceIndex = i;
                addLog('选中当前选手，点击目标格子移动');
                drawGame();
                return;
            }
            // 其他情况：显示信息
            else {
                addLog(athlete.icon + athlete.name + ' - 位置: ' + athlete.position + '，技能: ' + athlete.skill);
                return;
            }
        }
    }
    
    // ===== 检测点击格子（用于移动）=====
    if (selectedPieceIndex >= 0 && (turnState === 'prepare' || turnState === 'move' || turnState === 'end')) {
        for (let idx = 0; idx < CONFIG.TRACK_LENGTH; idx++) {
            const pos = getCellPos(idx);
            if (x >= pos.x && x <= pos.x + pos.w && y >= pos.y && y <= pos.y + pos.h) {
                const athlete = gameState.selectedAthletes[selectedPieceIndex];
                const oldPos = athlete.position;
                
                // 从旧格子移除
                const oldCell = gameState.track[oldPos];
                oldCell.athletes = oldCell.athletes.filter(a => a !== athlete);
                
                // 移动到新格子
                athlete.position = idx;
                gameState.track[idx].athletes.push(athlete);
                
                addLog(athlete.icon + athlete.name + ' 从 ' + oldPos + ' 移动到 ' + idx);
                selectedPieceIndex = -1; // 取消选择
                drawGame();
                return;
            }
        }
    }
    
    // ===== 检测点击左侧选手卡片区域 =====
    const listY = bottomY + cellSize + 14;
    const cardW = Math.min(120, (canvas.width - padding * 2) / gameState.selectedAthletes.length - 4);
    const cardH = 30;
    const cardListY = listY + 8;
    
    for (let i = 0; i < gameState.selectedAthletes.length; i++) {
        const cx = padding + i * (cardW + 4);
        if (x >= cx && x <= cx + cardW && y >= cardListY && y <= cardListY + cardH) {
            const athlete = gameState.selectedAthletes[i];
            // 准备阶段和结束阶段：任意选手可点击选择
            if (turnState === 'prepare' || turnState === 'end') {
                selectedPieceIndex = i;
                addLog('选中: ' + athlete.icon + athlete.name + ' - 点击格子移动');
                drawGame();
            }
            // 移动阶段：只能选当前回合选手
            else if (turnState === 'move' && i === currentAthleteIndex) {
                selectedPieceIndex = i;
                addLog('选中当前选手，点击目标格子移动');
                drawGame();
            }
            else {
                addLog(athlete.icon + athlete.name + ' - ' + athlete.skill);
            }
            return;
        }
    }
    
    // 点击空白处取消选择
    if (selectedPieceIndex >= 0) {
        selectedPieceIndex = -1;
        drawGame();
    }
}

// ============================================
// 设置界面
// ============================================

document.getElementById('playerCount').addEventListener('change', updatePlayerConfig);
document.getElementById('startGame').addEventListener('click', () => {
    const count = parseInt(document.getElementById('playerCount').value);
    document.getElementById('setupScreen').style.display = 'none';
    initGame(count);
});

// 按钮事件在 updateUI 中动态绑定
// 初始化时绑定占位函数
document.getElementById('rollDice').addEventListener('click', () => {
    // 实际逻辑在 updateUI 中重新绑定
});
document.getElementById('endTurn').addEventListener('click', () => {
    // 实际逻辑在 updateUI 中重新绑定
});

function updatePlayerConfig() {
    const count = parseInt(document.getElementById('playerCount').value);
    const configDiv = document.getElementById('playerConfig');
    configDiv.innerHTML = '<h4>玩家配置</h4>';
    
    for (let i = 0; i < count; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
            <label>玩家 ${i + 1} 名称：</label>
            <input type="text" id="playerName${i}" value="玩家 ${i + 1}" style="width: 100px">
        `;
        configDiv.appendChild(playerDiv);
    }
}

// 键盘快捷键：空格=进入投掷/掷骰子，回车=结束回合/进入下一阶段
document.addEventListener('keydown', (e) => {
    // 非比赛阶段不响应
    if (gameState.phase !== 'race') return;
    
    const rollBtn = document.getElementById('rollDice');
    const endBtn = document.getElementById('endTurn');
    
    // 空格键 → 触发掷骰按钮
    if (e.code === 'Space' && !rollBtn.disabled) {
        e.preventDefault();
        rollBtn.click();
        return;
    }
    
    // 回车键 → 触发结束回合按钮
    if (e.code === 'Enter' && !endBtn.disabled) {
        e.preventDefault();
        endBtn.click();
        return;
    }
});

// 初始化
updatePlayerConfig();
resizeCanvas();

// 游戏日志折叠/展开功能
document.getElementById('logToggleBtn').addEventListener('click', () => {
    const gameLog = document.getElementById('gameLog');
    const toggleBtn = document.getElementById('logToggleBtn');
    
    logCollapsed = !logCollapsed;
    gameLog.classList.toggle('log-collapsed');
    
    toggleBtn.textContent = logCollapsed ? '展开' : '收起';
});
