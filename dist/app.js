var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { exec } = require("child_process");
const baseExec = (command) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    });
});
const fn = "hofv";
const filters = [].map((filter) => {
    return "--filter " + filter;
});
baseExec(`pushd src && rm -f ${fn}.docx`);
baseExec(`pushd src && pandoc -f markdown -t docx ${fn}.md ${filters.join(" ")} -o ${fn}.docx --reference-doc ${fn}_ref.docx`);
//# sourceMappingURL=app.js.map