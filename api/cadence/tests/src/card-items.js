import { mintFlow } from "flow-js-testing";
import { 
	sendTransactionWithErrorRaised, 
	executeScriptWithErrorRaised, 
	deployContractByNameWithErrorRaised 
} from "./common"
import { getDibbsAdminAddress } from "./common";

export const args = [
  {
    name: "2010 Bowman Draft Picks Manny Machado ROOKIE RC #BDPP80 PSA 10 GEM MINT",
    grade: "PSA 10",
    serial: 22129333,
    image: "Qmec8XfVmibXTYhGMn9qst6sySmcDeQk8S9p4RVX9tTPzt"
  },
  {
    name: "2010 Bowman Draft Picks Manny Machado ROOKIE RC #BDPP80 PSA 10 GEM MINT",
    grade: "PSA 10",
    serial: 28474567,
    image: "QmY2oVKU6GfvyfnQJjybAhSiqnhZroG63oNkACAfp8LyZr"
  },
  {
    name: "2020 Panini Prizm WNBA Purple Sabrina Ionescu ROOKIE RC /125 #89 PSA 9 MINT",
    grade: "PSA 9",
    serial: 52961680,
    image: "QmbNSz7Bh1xS83HoMEgpzBsYFoVDSsdztYyAK12KYnQCKW"
  },
  {
    name: "2017 Donruss Football Patrick Mahomes II ROOKIE RC #327 PSA 10 GEM MINT",
    grade: "PSA 10",
    serial: 49277141,
    image: "QmTpX3jXyf9dLGGu4AhjcaB3KexJfG6kk49PPkFuUZNbi1"      
  },
  {
    name: "2019 Topps Chrome Bundesliga Erling Haaland ROOKIE RC #72 PSA 10 GEM MINT",
    grade: "PSA 10",
    serial: 49818702,
    image: "QmWr6mNCCFquHMsMy69qXxzRUGxxr3W9rW2fQshTzM6We1"
  }
]

/*
 * Deploys NonFungibleToken and CardItems contracts to DibbsAdmin.
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
export const deployCardItems = async () => {
	const DibbsAdmin = await getDibbsAdminAddress();
	await mintFlow(DibbsAdmin, "10.0");

	await deployContractByNameWithErrorRaised({ to: DibbsAdmin, name: "NonFungibleToken" });

	await deployContractByNameWithErrorRaised({ to: DibbsAdmin, name: "MetadataViews" });

	const addressMap = { 
		NonFungibleToken: DibbsAdmin,
		MetadataViews: DibbsAdmin,
	};
	
	return deployContractByNameWithErrorRaised({ to: DibbsAdmin, name: "CardItems", addressMap });
};

/*
 * Setups CardItems collection on account and exposes public capability.
 * @param {string} account - account address
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
export const setupCardItemsOnAccount = async (account) => {
	const name = "cardItems/setup_account";
	const signers = [account];

	return sendTransactionWithErrorRaised({ name, signers });
};

/*
 * Returns CardItems supply.
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64} - number of NFT minted so far
 * */
export const getCardItemSupply = async () => {
	const name = "cardItems/get_card_items_supply";

	return executeScriptWithErrorRaised({ name });
};

/*
 * Mints CardItem of a specific **itemType** and sends it to **recipient**.
 * @param {UInt64} itemType - type of NFT to mint
 * @param {string} recipient - recipient account address
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const mintCardItem = async (recipient, _name, _grade, _serial, _image) => {
	const DibbsAdmin = await getDibbsAdminAddress();

	const name = "cardItems/mint_card_item";
	const args = [recipient, _name, _grade, _serial, _image];
	const signers = [DibbsAdmin];

	return sendTransactionWithErrorRaised({ name, args, signers });
};

/*
 * Transfers CardItem NFT with id equal **itemId** from **sender** account to **recipient**.
 * @param {string} sender - sender address
 * @param {string} recipient - recipient address
 * @param {UInt64} itemId - id of the item to transfer
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const transferCardItem = async (sender, recipient, itemId) => {
	const name = "cardItems/transfer_card_item";
	const args = [recipient, itemId];
	const signers = [sender];

	return sendTransactionWithErrorRaised({ name, args, signers });
};

/*
 * Returns the CardItem NFT with the provided **id** from an account collection.
 * @param {string} account - account address
 * @param {UInt64} itemID - NFT id
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64}
 * */
export const getCardItem = async (account, itemID) => {
	const name = "cardItems/get_card_item";
	const args = [account, itemID];

	return executeScriptWithErrorRaised({ name, args });
};

/*
 * Returns the number of Card Items in an account's collection.
 * @param {string} account - account address
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64}
 * */
export const getCardItemCount = async (account) => {
	const name = "cardItems/get_collection_length";
	const args = [account];

	return executeScriptWithErrorRaised({ name, args });
};
