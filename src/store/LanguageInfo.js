export const languages = {
    python3: {
        label: "Python 3",
        extension: "py",
    },
    node: {
        label: "Nodejs",
        extension: "js",
    },
    java: {
        label: "Java",
        extension: "java",
    },
};

export const getDriverCode = (language, fileName) => {
    const className = fileName.split(".")[0];
    switch (language) {
        case "python3":
            return [
                "def main():",
                "   # write your code here",
                "",
                "if __name__ == '__main__':",
                "   main()",
            ].join("\n");
        case "java":
            return [
                "import java.util.*;",
                "public class " + className + " {",
                "    public static void main(String[] args) {",
                "        // write your code here",
                "    }",
                "}",
            ].join("\n");
        case "node":
            return [
                "async function main() {",
                "    // write your code here",
                "}",
                "",
                "main();",
            ].join("\n");
    }
};

export const checkIfDriverCode = (code, language, fileName) => {
    const driverCode = getDriverCode(language, fileName);
    return code.trim() === driverCode.trim();
};
