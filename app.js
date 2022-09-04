import getContract from "./utils/getContract.js";

async function getTodoList() {
  const contract = getContract();
  try {
    const response = await contract.getTodos();
    const formatted = response.map((item) => {
      return {
        name: item[0],
        description: item[1],
        status: item[2],
      };
    });
    return formatted;
  } catch (error) {
    console.log("error", error);
  }
}


const upadateTodoUI = async () => {
  const data = await getTodoList();
  // console.log(data, "data");
  data.forEach((item) => {
    todos.innerHTML += `   
    <li class='my-2 bg-blue-800 text-white p-4 flex justify-between items-center'>
      <span>
        <span class='font-bold'>${item.name}:</span> ${item.description}
      </span> 
      <span class='inline-block text-right'>
        <button class='bg-white text-black p-3'>Edit</button> 
        <button class='bg-green-500 p-3'>Toggle status</button> 
        <button class='bg-red-500 p-3'>Del</button></li>
      </span>`;
  });
};

upadateTodoUI();

createTodoBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const todoTitle = tdTitle.value;
  const todoDescription = tdDescription.value;

  console.log(todoTitle);

  await createNewTodo(todoTitle, todoDescription);
})

async function createNewTodo(title, description) {
  const contract = getContract(true);
  try {
    const tnx = await contract.createTodo(title, description);
    const response = await tnx.wait();

    todos.innerHTML = "";
    await upadateTodoUI();
    
    console.log(response);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    console.log("Finally here");
  }
}

// add new list
