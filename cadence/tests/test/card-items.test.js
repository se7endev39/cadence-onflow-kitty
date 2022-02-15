import path from "path";

import { 
	emulator,
	init,
	getAccountAddress,
	shallPass,
	shallResolve,
	shallRevert,
} from "flow-js-testing";

import { getDibbsAdminAddress } from "../src/common";
import {
	deployCardItems,
	getCardItemCount,
	getCardItemSupply,
	mintCardItem,
	setupCardItemsOnAccount,
	transferCardItem,
	args
} from "../src/card-items";

// We need to set timeout for a higher number, because some transactions might take up some time
jest.setTimeout(50000);

describe("Card Items", () => {
	// Instantiate emulator and path to Cadence files
	beforeEach(async () => {
		const basePath = path.resolve(__dirname, "../../");
		const port = 7002;
		await init(basePath, { port });
		await emulator.start(port, false);
		return await new Promise(r => setTimeout(r, 1000));
	});

	// Stop emulator, so it could be restarted
	afterEach(async () => {
		await emulator.stop();
		return await new Promise(r => setTimeout(r, 1000));
	});

	it("should deploy CardItems contract", async () => {
		await deployCardItems();
	});

	it("supply should be 0 after contract is deployed", async () => {
		// Setup
		await deployCardItems();
		const DibbsAdmin = await getDibbsAdminAddress();
		await shallPass(setupCardItemsOnAccount(DibbsAdmin));

		await shallResolve(async () => {
			const supply = await getCardItemSupply();
			expect(supply).toBe(0);
		});
	});

	it("should be able to mint a Card item", async () => {
		// Setup
		await deployCardItems();
		const Alice = await getAccountAddress("Alice");
		await setupCardItemsOnAccount(Alice);
    
		// Mint instruction for Alice account shall be resolved
		const {name, grade, serial, image} = args[0]
    await shallPass(mintCardItem(Alice, name, grade, serial, image));
	});

	it("should be able to create a new empty NFT Collection", async () => {
		// Setup
		await deployCardItems();
		const Alice = await getAccountAddress("Alice");
		await setupCardItemsOnAccount(Alice);

		// shall be able te read Alice collection and ensure it's empty
		await shallResolve(async () => {
			const itemCount = await getCardItemCount(Alice);
			expect(itemCount).toBe(0);
		});
	});

	it("should not be able to withdraw an NFT that doesn't exist in a collection", async () => {
		// Setup
		await deployCardItems();
		const Alice = await getAccountAddress("Alice");
		const Bob = await getAccountAddress("Bob");
		await setupCardItemsOnAccount(Alice);
		await setupCardItemsOnAccount(Bob);

		// Transfer transaction shall fail for non-existent item
		await shallRevert(transferCardItem(Alice, Bob, 1337));
	});

	it("should be able to withdraw an NFT and deposit to another accounts collection", async () => {
		await deployCardItems();
		const Alice = await getAccountAddress("Alice");
		const Bob = await getAccountAddress("Bob");
		await setupCardItemsOnAccount(Alice);
		await setupCardItemsOnAccount(Bob);

		// Mint instruction for Alice account shall be resolved
    const {name, grade, serial, image} = args[0]
    await shallPass(mintCardItem(Alice, name, grade, serial, image));

		// Transfer transaction shall pass
		await shallPass(transferCardItem(Alice, Bob, 0));
	});
});
