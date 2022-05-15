export const upload = (onUploadCallback) => {
    const fileUpload = document.createElement("input");
    fileUpload.setAttribute("type", "file");
    fileUpload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            onUploadCallback(e.target.result);
        }
        reader.readAsText(file);
    });
    fileUpload.click();
}