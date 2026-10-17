const form = document.getElementById('form');
const output = document.getElementById('output_text');
let start_string = ""
let final_command = ""

form.addEventListener('input', () => {
    generate_output_command();
});

function generate_output_command() {
    const data = new FormData(form);

    let current_final_command = start_string + "{id:command_block_minecart,Command:\"/setblock ";

    // get position
    let command_position = data.get('position').trim().toLowerCase();

    // get command block type
    let command_type = data.get('command_type').trim().toLowerCase();

    // get conditional
    let conditional = data.get('conditional').trim().toLowerCase();

    // get command block facing direction
    let direction = data.get('direction').trim().toLowerCase();

    // get always active
    let always_active = data.get('always_active').trim().toLowerCase();

    // get command
    let command = data.get('command').trim().replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("'", "\\'").replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("'", "\\'");

    current_final_command += command_position + " " + command_type + "command_block[conditional=" + conditional + ",facing=" + direction + "]{auto:" + always_active + ",Command:\\\"" + command + "\\\"}\"},";

    final_command = current_final_command;

    /* 
    /summon minecraft:falling_block ~ ~1 ~ {BlockState:{id:"minecraft:redstone_block"},Passengers:[{id:"minecraft:falling_block",BlockState:{id:"minecraft:activator_rail"},Passengers:[

    {id:command_block_minecart,Command:"/setblock 

    command_block[conditional=

    ,facing=

    ]{auto:
    
    ,Command:\"

    \"}"},

    {id:command_block_minecart,Command:"/setblock ~ ~-1 ~ command_block{auto:1,Command:\"/fill ~ ~-1 ~ ~ ~1 ~ air\"}"},{id:command_block_minecart,Command:"/kill @e[type=command_block_minecart]"}]}]}
    */
    output.textContent = "/summon minecraft:falling_block ~ ~1 ~ {BlockState:{id:\"minecraft:redstone_block\"},Passengers:[{id:\"minecraft:falling_block\",BlockState:{id:\"minecraft:activator_rail\"},Passengers:[" + final_command + "{id:command_block_minecart,Command:\"/setblock ~ ~-2 ~ command_block{auto:1,Command:\\\"/fill ~ ~-1 ~ ~ ~1 ~ air\\\"}\"},{id:command_block_minecart,Command:\"/kill @e[type=command_block_minecart]\"}]}]}"
}

function add_command_block() {
    start_string += final_command;
    form.reset()
}
