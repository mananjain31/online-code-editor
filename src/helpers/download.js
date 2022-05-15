export const download = (content, fileName) => {
    const l = document.createElement("a");
    l.href = "data:text/plain;charset=UTF-8," + content;
    l.setAttribute("download", fileName || 'Untitled.txt');
    l.click();
}