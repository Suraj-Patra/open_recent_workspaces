const fs = require('fs');   // To read the file
const child_process = require('child_process'); // To execute the commands


const open_file = () => {

    const path = '/home/suraj/Desktop/open_recent_workspaces/commands.txt'; //path of command file

    fs.readFile(path, (err, data) => {
        data = data.toString(); // Reading file data
        data_arr = data.split('\n');    // Converting into array by newline

        command_arr = data_arr.filter((data) => {
            return (data!=='') && data; // Removing the empty strings from array
        })

        console.log(command_arr);
        open_programs(command_arr);
    })
}

open_file();


const open_programs = (command_arr) => {

    for(let command of command_arr) {

        let commands = form_command(command);

        let workspace_command = define_workspace(commands);

        const full_command = define_command(commands);

        child_process.exec(workspace_command);
        child_process.exec(full_command);   // Executing the command

    }

}

const form_command = (command) => {

    // Converting the commands by ':'
    let command_arr = command.split(':');

    // Trimming the space around the commands if there any.
    command_arr[0] = command_arr[0].trim();
    command_arr[1] = command_arr[1].trim();
    command_arr[2] = command_arr[2].trim();

    return command_arr;
}


const define_workspace = (commands) => {

    let [, , workspace] = commands;

//     const title = end_command.substr(end_command.lastIndexOf('/')+1);
//     console.log('name', title);

    workspace = Number(workspace);
    const workspace_command = `wmctrl -s ${workspace-1}`;

    console.log(`wmctrl -s ${workspace}`);
    return workspace_command;
}



const define_command = (commands) => {

    let [start_command, end_command] = commands;

    /*
        - For 'cd' commands it would be termnial, so command will be like this
        - `cd /home/suraj/Desktop && x-terminal-emulator`
        - First going to the file, and then opening the terminal
        - For other command it will be like this : `subl /home/suraj`
    */

    let full_command = '';


    if(start_command === 'cd'){
        full_command = `${start_command} ${end_command} && x-terminal-emulator`;
    } else {
        full_command = `${start_command} ${end_command}`;
    }

    return full_command;
}



/*
    Want to add :
        
        1. comments in the command file and it would be ignored. In this instructions will be given for commands.
        
        2. how to choose workspace for specific program by terminal ? And then add the workspace feature, so that specific program will open in specific workspaces.
 
*/




























