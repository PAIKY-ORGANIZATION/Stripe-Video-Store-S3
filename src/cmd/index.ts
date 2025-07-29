import inquirer from "inquirer";
import { seedDb } from "./seed_db";
import { emptyDb } from "./empty_db";


const seedDbKey = 'Seed videos in database'
const deleteDbKey = 'Wipe entire database'

const main = async ()=>{

    const result = await inquirer.prompt([
        {
            message: 'Select Action to perform',
            name: 'Action',
            type: 'list',
            choices: [seedDbKey, deleteDbKey]
        }
    ])


    switch(result.Action){
        case seedDbKey:
            await  seedDb()
            break
        case deleteDbKey:
            await emptyDb()
            break
    }
}


main()