process.stdin.setEncoding('utf8');

// Read stdin for inputing cmd
process.stdin.on('readable', () => {
    let input = process.stdin.read();
    
    if (input !== null) {
        let cmd = input.toString().trim();

        if (cmd === 'exit') {
            console.log('Close server.');
            process.exit(0);
        }
    }
});