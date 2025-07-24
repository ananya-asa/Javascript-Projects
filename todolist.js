const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let toDos = [];

function taskMenu() {
    console.log(`
1. Add Task
2. View Task
3. Delete Task
4. Exit
`);
    rl.question("What do you want to do? ", handleMenu);
}

function handleMenu(choice) {
    switch (choice.trim()) {
        case "1":
            rl.question("Add your task: ", (ans) => {
                toDos.push(ans);
                console.log("✅ Task Added!");
                taskMenu();
            });
            break;

        case "2":
            if (toDos.length === 0) {
                console.log(" No tasks to show.");
            } else {
                console.log(" Your tasks:");
                toDos.forEach((todo, i) => console.log(`${i + 1}. ${todo}`));
            }
            taskMenu();
            break;

        case "3":
            if (toDos.length === 0) {
                console.log(" No tasks to delete.");
                taskMenu();
            } else {
                toDos.forEach((todo, i) => console.log(`${i + 1}. ${todo}`));
                rl.question("Which task number do you want to delete? ", (ans) => {
                    const index = parseInt(ans) - 1;
                    if (!isNaN(index) && index >= 0 && index < toDos.length) {
                        const removed = toDos.splice(index, 1);
                        console.log(` Removed: "${removed[0]}"`);
                    } else {
                        console.log(" Invalid task number.");
                    }
                    taskMenu();
                });
            }
            break;

        case "4":
            console.log(" Goodbye! See you soon ❤️");
            rl.close();
            break;

        default:
            console.log(" Invalid choice! Try again.");
            taskMenu();
    }
}

taskMenu();
