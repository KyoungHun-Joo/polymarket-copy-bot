module.exports = {
    apps: [
        {
            name: 'trading-bot',
            script: 'npm',
            args: 'run start',
            interpreter: 'none',
            exec_mode: 'fork',
        },
    ],
};
