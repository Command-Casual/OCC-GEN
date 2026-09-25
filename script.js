const form = document.getElementById('form');
const output = document.getElementById('output_text');
const position = document.getElementById('position');
let start_string = "";
let end_string = "air}}]}]";
let current_final_command = "";

position.addEventListener('input', () => {
    generate_output_command();
});

form.addEventListener('input', () => {
    generate_output_command();
});

function generate_output_command() {
    const data = new FormData(form);

    let final_command = "";

    // get command block type
    let command_type = data.get('command_type').trim().toLowerCase();

    final_command += command_type + "command_block,properties:{facing:\"";

    // get command block facing direction
    let direction = data.get('direction').trim().toLowerCase();

    final_command += direction + "\",conditional:\"";

    // get conditional
    let conditional = data.get('conditional').trim().toLowerCase();

    final_command += conditional + "\"}},TileEntityData:{auto:";

    // get always active
    let always_active = data.get('always_active').trim().toLowerCase();

    final_command += always_active + ",Command:\"";

    // get command
    let command = data.get('command').trim().replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("'", "\\'");

    final_command += command + "\"},Passengers:[{id:armor_stand,Health:0,Passengers:[{id:falling_block,BlockState:{id:";

    current_final_command = final_command;

    output.textContent = "/summon minecraft:falling_block " + position.value.trim().toLowerCase() + " {BlockState:{id:" + start_string + final_command + end_string + "}";
}

function add_command_block() {
    start_string += current_final_command;
    end_string += "}]}]";
    form.reset()
}
