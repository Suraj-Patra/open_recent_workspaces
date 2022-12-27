const fs = require('fs');   // To read the file
const child_process = require('child_process'); // To execute the commands


const open_file = () => {

    const path = '/home/suraj/Desktop/commands.txt'; //path of command file

    fs.readFile(path, (err, data) => {
        data = data.toString(); // Reading file data
        data_arr = data.split('\n');    // Converting into array by newline

        command_arr = data_arr.filter((data) => {
            return (data!=='') && data; // Removing the empty strings from array
        })

        console.log(command_arr);
        open_work_space(command_arr);
    })
}

const open_work_space = (command_arr) => {

    for(let command of command_arr) {

        // Converting the commands by ':'
        let [start_command, end_command] = command.split(':');
        start_command = start_command.trim();   // Trimming the space around the commands if there any.
        end_command = end_command.trim();

        // For cd commands it would be termnial, so command will be like this
        // `cd /home/suraj/Desktop && x-terminal-emulator`
        // First going to the file, and then opening the terminal
        // For other command it will be like this : `subl /home/suraj`
        let full_command = '';
        if(start_command === 'cd'){
            full_command = `${start_command} ${end_command} && x-terminal-emulator`;
        } else {
            full_command = `${start_command} ${end_command}`;
        }


        console.log(full_command);
        child_process.exec(full_command);   // Executing the command
    }
}


open_file();





/*
    Want to add :
        
        1. comments in the command file and it would be ignored. In this instructions will be given for commands.
        
        2. how to choose workspace for specific program by terminal ? And then add the workspace feature, so that specific program will open in specific workspaces.
 
*/




























