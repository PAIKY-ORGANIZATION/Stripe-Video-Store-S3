import inquirer from "inquirer";
import { seedDb } from "./actions/seed_db";
import { wipeDb } from "./actions/wipe_db";


const seedDbKey = 'Seed videos in database'
const wipeDbKey = 'Wipe entire database'
const wipeDbAndSeedKey = 'Wipe database and seed'

const main = async ()=>{

    const result = await inquirer.prompt([
        {
            message: 'Select Action to perform',
            name: 'Action',
            type: 'list',
            choices: [seedDbKey, wipeDbKey, wipeDbAndSeedKey]
        }
    ])


    switch(result.Action){
        case seedDbKey:
            await  seedDb()
            break
        case wipeDbKey:
            await wipeDb()
            break
        case wipeDbAndSeedKey:
            await wipeDb()
            await seedDb()
            break
    }
}


main()