const nem = require("nem-sdk").default;
const model = nem.model;
const defaultTestnet = model.nodes.defaultTestnet;
const defaultPort = model.nodes.defaultPort;
const endpoint = model.objects.create("endpoint")(defaultTestnet, defaultPort);
const testnetId = nem.model.network.data.testnet.id;

const requests = nem.com.requests;
requests.chain.height(endpoint).then(res => {
    console.log(`Height ${res.height} blocks`)
}, err => {
    console.error(err);
});

let showAccountInfo = (address) => {
    let isValid = model.address.isValid(address);
    const account = requests.account;

    if (isValid) {
        account.data(endpoint, address)
            .then(result => {
                console.log(JSON.stringify(result, null, 2))
            })
            .catch(reason => console.log(reason));
    }

};

let accounts = {
    w_one: {
        primary: 'TAR5UOYLFHCJZAIW3DFQS2GSRPGIFZCLVYP2LSCD',
        multisign: 'TAE2PYP2FBQRAOJRQ2KDK5N7FNCBPYZYV7QHKBEI'
    }
};

showAccountInfo(accounts.w_one.primary);
showAccountInfo(accounts.w_one.multisign);