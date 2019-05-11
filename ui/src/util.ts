export function rand(n: number) {
    return Math.floor(Math.random() * n);
}

export function rand256() {
    let c = rand(256);
    return Math.floor(c);
}

export function getColor() {
    var r = rand256();
    var g = rand256();
    var b = rand256();
    return color(r, g, b);
}

export function hex2(n: number): string {
    let str = n.toString(16);
    if (str.length == 1) {
        return "0" + str;
    }
    return str;
}

export function color(r: number, g: number, b: number) {
    var clr = "#" + hex2(r) + hex2(g) + hex2(b);
    //console.log(clr);
    return clr;
}
