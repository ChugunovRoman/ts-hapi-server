process.stdin.setEncoding('utf8');

// Read stdin for inputing cmd
process.stdin.on('readable', () => {
    let input: string | Buffer = process.stdin.read();
    
    if (input !== null) {
        let cmd: string = input.toString().trim();

        if (cmd === 'exit') {
            console.log('Close server.');
            process.exit(0);
        } else if (cmd === 'getPid') {
            console.log('PID: ', process.pid);
        }
    }
});