process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
    let input = process.stdin.read();
    
    if (input !== null) {
        let cmd = input.toString().trim();

        console.log('cmd: ', cmd);
        if (cmd === 'exit') {
            process.exit(0);
        } else if (cmd === 'require') {
            console.log(require);
        }
    }
});