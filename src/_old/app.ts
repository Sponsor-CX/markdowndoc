const { exec } = require("child_process");

const baseExec = async (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (error: any, stdout: any, stderr: any) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    });
}

const fn = "hofv";
const filters = [].map((filter) => {
    return "--filter " + filter;
});

baseExec(`pushd src && rm -f ${fn}.docx`);
baseExec(`pushd src && pandoc -f markdown -t docx ${fn}.md ${filters.join(" ")} -o ${fn}.docx --reference-doc ${fn}_ref.docx`);
