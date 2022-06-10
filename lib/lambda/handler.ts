export async function handler (event: string, context: string){
    console.log('stage name is: '+ process.env.stage);
    return {
        body: 'Hello from Ismails Lambda',
        statusCode:200,

    }
}