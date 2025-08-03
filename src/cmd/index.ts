import inquirer from "inquirer";
import { seedDb } from "./actions/seed_db";
import { wipeDb } from "./actions/wipe_db";
import { manageRefundRequests } from "./actions/manage-refund-requests";



import '@/bootstrap'


const seedDbKey = 'Seed videos in database'
const wipeDbKey = 'Wipe entire database'
const wipeDbAndSeedKey = 'Wipe database and seed'
const manageRefundsKey = 'Manage refunds'


const main = async ()=>{

    const result = await inquirer.prompt([
        {
            message: 'Select Action to perform',
            name: 'Action',
            type: 'list',
            choices: [seedDbKey, wipeDbKey, wipeDbAndSeedKey, manageRefundsKey]
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
        case manageRefundsKey:
            await manageRefundRequests()
            break
    }
}


main()