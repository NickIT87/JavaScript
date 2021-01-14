const nums: number = 42

let testes: string = 'Hello world'

console.log(testes, nums)

let arsr1: Array<number> = [1, 2, 4]
let arsr2: number[] = [234, 23, 45]

function majority(a: Array<number>, b: number[]): number {
    let temp: number[]

    for (let i: number in a ) {
        b.forEach(element => {
            console.log(i + element)
        });
    }
    //return 0
}

majority(arsr1, arsr2)