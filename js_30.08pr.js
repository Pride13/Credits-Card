//credits card
let userCard = function (cardId) {
    let cardInfo = {
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],
        key: cardId
    };
    return{
        putCredits: (money) => {
            console.log(money);
            cardInfo.balance += money;
            toTrackLogs('putCredits', money)
        },

        takeCredits: (money) => {
            if (cardInfo.transactionLimit < money) {
                throw new Error(`Your limit is ${cardInfo.transactionLimit}`);
            }

            if (cardInfo.balance < money) {
                throw new Error(`You haven't enough ${money} on your bank account`);
            }

            cardInfo.balance -= money;
            toTrackLogs('takeCredits', money)
        },

        setTransactionLimit: (cardLimit) =>{
            if (cardLimit < 0) {
                throw new Error('Your limit must be greater than 0')
            }

            cardInfo.transactionLimit = cardLimit;
            toTrackLogs('changeLimit', cardLimit)
        },

        transferCredits: (money, card) => {
            if (cardInfo.transactionLimit < money) {
                throw new Error(`Your limit is ${cardInfo.transactionLimit}`);
            }

            if (cardInfo.balance < money) {
                throw new Error(`You haven't enough ${money} on your bank account`);
            }

            cardInfo.balance -= money;
            card.putCredits(money);
        },

        getLogs: () => {
            console.log(cardInfo.historyLogs);
        },

        getInfo: () => {
            console.log({
                balance: cardInfo.balance,
                transactionLimit: cardInfo.transactionLimit
            });
        }
    };

    function toTrackLogs(transactionType, count) {
        cardInfo.historyLogs.push({
            type: transactionType,
            count,
            time: new Date().toISOString()
        })
    }
};

let card1 = userCard(1);
let card2 = userCard(2);
let card3 = userCard(3);

card1.setTransactionLimit(100);
card1.takeCredits(20);
card1.transferCredits(50, card2);
card2.transferCredits(10, card1);

card1.getInfo();
card1.getLogs();
card2.getInfo();
card2.getLogs();
card3.getInfo();
card3.getLogs();




