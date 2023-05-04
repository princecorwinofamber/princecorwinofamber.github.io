// just an interface
export class Instructions {
    // execute the instuction for the given world and bug
    perform(world, bug) {}
    // validate all jump addresses that are present in this instruction. last_address is the last allowed address (0 is the first allowed address). returns true if addresses are correct, false otherwise
    check_jumps(last_address) {}
}
