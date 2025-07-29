import inquirer from "inquirer";


const main = async ()=>{

    const result = await inquirer.prompt([
        {
            message: 'Select Action to perform',
            name: 'Action',
            type: 'list',
            choices: ['1', '2']
        }
    ])


    console.log(result.Action);
    

}


main()