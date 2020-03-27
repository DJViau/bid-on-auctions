# How to set up

1 - Clone this repo (`git clone git@github.com:DJViau/bid-on-auctions.git`) this makes a copy of this folder on your computer

>1a - Alternative, possibly easier, approach: click `Clone or download` on github, click `Download ZIP`, and unzip the file onto your desktop.

2 - Open up the terminal and navigate to the folder. (Something like `cd ~/Desktop/bid-on-auctions/` will be the command for this).

3 - Set up a .env file with contents like this:

```
export INFURA_KEY="66a6b18cc0f1234f9fef5bc1f56c6b01"
export MNEMONIC="bla bla bla bla your meta mask seed phrase here"
export USER_ADDRESS="0xbb5801a7d398351b8be21c439e04c5b3258abc9b"
export NETWORK="mainnet"
```

4 - Run `nvm use 8.11.2`.  You might need to install nvm first.

>4a You might have to install some stuff like npm and node before this will work.

>4b Get Homebrew (type `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` into the command line and press enter). To install node and npm, type `brew update` into the terminal and press enter, then type `brew install node` into the terminal and press enter.  If everything goes well, you'll have all the fundamental tools.

5 - Run `npm install`

This will take a little while to run.  It's OK if you get warnings, but if you get errors, you should ask someone about them.  After running `npm install`, you should see a new `node_modules` folder.  If something goes wrong and you need to run `npm install` again, you should delete your `node_modules` folder first.  Don't worry, running `npm install` will regenerate it. 


# How to use

## A preliminary note on environment variables

In addition to what you cloned from github, you'll need another file in your directory to make this all work nicely: a `.env` file.

You can set stuff like `export INFURA_KEY="<your_key_here>"` in it, then enter `. .env` or `source .env` on the command line, and when you run one of the scripts below, the `const INFURA_KEY = process.env.INFURA_KEY` line at the top of the file will grab the value from your `.env` file and set it to the `INFURA_KEY` constant.

It's super reliable and it helps to protect your private info.  If you're not certain whether your environment variables are causing you trouble, just try console logging them.  I advise against hardcoding sensitive information into your script.

## Placing a bid

Source your .env file by entering `. .env`

Type `node bid.js` and press enter.  Wait a few seconds, and you should see `Bidding on https://opensea.io/assets/${TARGET_CONTRACT_ADDRESS}/${tokenId}`.  Wait a few more seconds, and you should see:

```
Already approved enough currency for trading
Order hashes match
Successfully created a buy order! https://opensea.io/assets/<TARGET_CONTRACT_ADDRESS>/<tokenId>
```

Navigate to the link that gets logged in the console to verify that your bid is showing up on the item.  

That's it!


# What next?

For more info on programmatically finding assets you're interested in, visit our [SDK repository](https://github.com/ProjectOpenSea/opensea-js) and our [API reference docs](https://docs.opensea.io/reference).  

Once you've got an array of assets you want to bid on, you could iterate over them and bid on each.  This repo only intends to provide a starting point.  It's up to you where to go from here!  

If you have any questions or want to share something you built, ping me on [Twitter](https://twitter.com/dan_OpenSea).