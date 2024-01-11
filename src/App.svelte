<script lang="ts">
    import { onMount } from 'svelte';

    let cardholderName = 'Jane Appleseed';
    let cardNumber = '0000 0000 0000 0000';
    let expMonth = '00';
    let expYear = '00';
    let cvc = '000';
    let showSuccessMessage = false;

    let card = {
        cardholderName: 'Jane Appleseed',
        cardNumber: '0000 0000 0000 0000',
        expDate: '00/00',
        cvc: '000',
    };

    function updateCardDetails() {
        card.cardholderName = cardholderName;
        card.cardNumber = maskCardNumber(cardNumber);
        card.expDate = `${expMonth}/${expYear}`;
        card.cvc = cvc;
    }

    function maskCardNumber(number: string) {
        // Implement your logic to mask the card number as needed
        return '0000 0000 0000 ' + number.slice(-4);
    }

    function confirmDetails() {
        // You might want to perform additional validation here before showing the success message
        updateCardDetails();
        showSuccessMessage = true;
    }

    onMount(() => {
        updateCardDetails();
    });
</script>

<main class="main">
    <aside class="side-background"></aside>

    <section class="center-cards">
        <picture class="card-gray">
            <img src="./public/mobile/mobile-card-gray.svg" alt="Gray card" />
        </picture>

        <div class="card-purple">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="54"
                height="30"
                viewBox="0 0 54 30"
                fill="none"
                >
                <ellipse cx="15.0932" cy="15" rx="15.0932" ry="15" fill="white" />
                <path
                    d="M53.5 15C53.5 18.4489 50.6859 21.25 47.2081 21.25C43.7302 21.25 40.9161 18.4489 40.9161 15C40.9161 11.5511 43.7302 8.75 47.2081 8.75C50.6859 8.75 53.5 11.5511 53.5 15Z"
                    stroke="white"
                />
            </svg>

            <p class="card-purple__number">{card.cardNumber}</p>

            <div class="card-purple__name-cvc">
                <p>{card.cardholderName}</p>
                <p>{card.expDate}</p>
            </div>
        </div>
    </section>

    <section class="side-form">
        {#if !showSuccessMessage}
          <form on:submit|preventDefault={confirmDetails}>
            <div class="form-name-number">
                <label>
                    Cardholder Name: <br>
                    <input type="text" bind:value={cardholderName} placeholder="e.g. Jane Appleseed" />
                </label>

                <label>
                    Card Number: <br>
                    <input type="text" bind:value={cardNumber} placeholder="e.g. 1234 5678 9123 0000" />
                </label>
            </div>
            
            <div class="form-date-cvc">
                <label>
                    Exp. Date (MM/YY) &nbsp; CVC <br>
                    <div>
                        <input type="text" bind:value={expMonth} placeholder="MM" />
                        <input type="text" bind:value={expYear} placeholder="YY" />
                        <input type="text" bind:value={cvc} placeholder="e.g. 123" />
                    </div>
                </label>      
            </div>
            
            <button class="button" type="submit">Confirm</button>
          </form>
        {:else}
          <div class="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="url(#paint0_linear_0_524)"/>
                <path d="M28 39.9199L36.0801 48L52.0801 32" stroke="white" stroke-width="3"/>
                <defs>
                  <linearGradient id="paint0_linear_0_524" x1="-23.0143" y1="11.5071" x2="1.03143e-06" y2="91.5071" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6348FE"/>
                    <stop offset="1" stop-color="#610595"/>
                  </linearGradient>
                </defs>
            </svg>
            <p class="congratulations">THANK YOU!</p>
            <p class="explanation">We’ve added your card details.</p>
            <button class="button" type="submit">Continue</button>
          </div>
        {/if}
      </section>
</main>

<style>
    .main {
        position: relative;
    }

    .side-background {
        min-height: 15rem;
        background-color: var(----bg-aside-color);
        background-image: url("../public/mobile/mobile-background-colors.svg");
        background-size: cover;
        background-position: center;
    }

    .center-cards {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, 7.5%);
    

        & .card-gray {
            margin-right: -1.78125rem;
        }

        & .card-purple {
            margin-left: -1.71875rem;
            margin-top: -4.2rem;
            padding: 1.125rem;
            min-width: 15.5625rem;
            border-radius: 0.375rem;
            background: url("../public/mobile/mobile-card-purple-background.svg"), var(--bg-card-color);
            background-repeat: no-repeat;
            background-position: right;
            color: var(--text-primary-color);
            position: relative;
            z-index: 1;
        }

        & .card-purple__number {
            margin-top: 2.3125rem;
            line-height: normal;
            letter-spacing: 0.1375rem;
        }

        & .card-purple__name-cvc {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1.0625rem;
            font-size: 0.5625rem;
        }
    }

    .side-form {
        margin-top: 5.626rem;
        margin-right: auto;
        margin-left: auto;
        padding: 0 1.5rem 2.8125rem 1.5rem;
        text-transform: uppercase;
        line-height: normal;
        letter-spacing: 0.125rem;
        font-size: 0.75rem;
        max-width: 20.45rem;

        & input {
            border-radius: 8px;
            border: 1px solid #DFDEE0;
        }

        & .form-name-number {
            display: flex;
            flex-direction: column;
        }

        & .form-name-number input {
            padding: 0.6875rem 0 0.6875rem 1rem;
            margin: 0.5625rem 0 1.25rem 0;
            min-width: 94%;
        }

        & .form-date-cvc {
            margin-bottom: 1.75rem;
        }

        & .form-date-cvc div {
            display: flex;
            gap: 0.5625rem;
        }

        & .form-date-cvc input:not(:last-child) {
            margin-top: 0.5625rem;
            padding: 0.6875rem 0.875rem 0.6875rem 1rem;
            max-width: 2.625rem;
        }

        & .form-date-cvc input:last-child {
            margin-top: 0.5625rem;
            padding: 0.6875rem 5.125rem 0.6875rem 1rem;
            min-width: 15%;
        }

        & .button {
            cursor: pointer;
            padding: 0.9375rem 8.125rem;
            border-radius: 8px;
            background: var(--bg-button-color);
            color: var(--text-primary-color);
            min-width: 100%;
        }

        & .success-message {
            text-align: center;
        }

        & .success-message svg {
            margin-bottom: 2.1875rem;
        }

        & .success-message .congratulations {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            line-height: normal;
            letter-spacing: 3.422px;
            color: var(--text-secondary-color);
        }

        & .success-message .explanation {
            letter-spacing: normal;
            text-transform: none;
            margin-bottom: 3rem;
            color: var(--text-explanation-color);
        }
    }
</style>
