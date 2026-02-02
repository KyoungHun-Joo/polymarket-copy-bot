module.exports = {
    apps: [
        {
            name: 'trading-bot',
            restart_delay: 30000,
            script: 'npm',
            args: 'run start',
            interpreter: 'none',
            exec_mode: 'fork',
        },
    ],
};
