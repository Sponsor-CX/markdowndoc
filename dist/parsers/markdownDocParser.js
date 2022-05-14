"use strict";
/**
 * This is a parser file to parse .mdd files which are a special type of markdown into a .docx file
 **/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = void 0;
const fs = __importStar(require("fs"));
// open the file to parse
const getFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};
class Parse {
    constructor() {
        this.center = (line) => {
            const center = line.text.match(/<center>(.*)<\/center>/);
            if (center) {
                return {
                    text: center[1],
                    found: !!center,
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
        this.underline = (line) => {
            const underline = line.text.match(/__(.*)__/);
            if (underline) {
                return {
                    text: underline[1],
                    found: !!underline,
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
        this.italics = (line) => {
            const italics = line.text.match(/\*\*(.*)\*\*/);
            if (italics) {
                return {
                    text: italics[1],
                    found: !!italics,
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
        this.bold = (line) => {
            const bold = line.text.match(/\*(.*)\*/);
            if (bold) {
                return {
                    text: bold[1],
                    found: !!bold,
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
        this.links = (line) => {
            const links = line.text.match(/\[(.*)\]\((.*)\)/);
            if (links) {
                return {
                    text: links[1],
                    found: links[2],
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
        this.lineBreak = (line) => {
            const lineBreak = line.text.match(/\\n/);
            if (lineBreak) {
                return {
                    text: '',
                    found: true,
                };
            }
            return {
                text: line.text,
                found: false,
            };
        };
    }
}
const parse = new Parse();
const parseFile = (filePath) => {
    const file = getFile(filePath);
    const lines = file.split('\n');
    lines.forEach((l) => {
        const line = {
            text: l,
            found: false,
        };
        const center = parse.center(line);
        if (center.found) {
            console.log(center.text);
        }
        const underline = parse.underline(center);
        if (underline.found) {
            console.log(underline.text);
        }
        const italics = parse.italics(underline);
        if (italics.found) {
            console.log(italics.text);
        }
        const bold = parse.bold(italics);
        if (bold.found) {
            console.log(bold.text);
        }
        const links = parse.links(bold);
        if (links.found) {
            console.log(links.text);
        }
        const lineBreak = parse.lineBreak(links);
        if (lineBreak.found) {
            console.log(lineBreak.text);
        }
    });
};
exports.parseFile = parseFile;
//# sourceMappingURL=markdownDocParser.js.map