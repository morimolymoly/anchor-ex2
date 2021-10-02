const assert = require("assert");
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('ex2', () => {
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Ex2;

    const myAccount = anchor.web3.Keypair.generate();

    const tx = await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });
    console.log("Your transaction signature", tx);

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(1234)));
    _myaccount = myAccount;
  });

  it("update account", async () => {
    const myAccount = _myaccount;
    const program = anchor.workspace.Ex2;

    await program.rpc.update(new anchor.BN(4321), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    })

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(4321)));
  });
});
