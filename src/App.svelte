<script lang="ts">
    import Button from "./lib/Button/index.svelte"
    import Success from "./lib/Success/index.svelte";
    import FormInput from "./lib/FormInput";
    import CardFront from "./lib/CardFront"
    import { onMount } from 'svelte';

    import { createForm } from "felte";
    import { validator } from "@felte/validator-zod";
    import { reporter, ValidationMessage } from "@felte/reporter-svelte";
    import { z } from "zod";
    import { schema } from "./lib/FormInput/Form.schema";
    import { formSubmittedStore, formInputs } from "./lib/store/formStatus";

    let {
        cardholderName,
        cardNumber,
        cardExpireDateMonth,
        cardExpireDateYear,
        cvcCode,
    } = $formInputs;

    type FormSchema = z.infer<typeof schema>;

    const { form, errors, isValid, reset } = createForm<FormSchema>({    
        onSubmit(values, context) {
            console.log(values)
        },
        onSuccess(values) {
            reset();      
            $formSubmittedStore = true;
        },
        onError(err, context) {
            console.log("onError", { err, context });
        },
        extend: [validator({ schema }), reporter],
    });

    const handleSuccessPage = () => {
        $formSubmittedStore = false;
        cardholderName = "";
        cardNumber = '';
        cardExpireDateMonth = '';
        cardExpireDateYear = '';
        cvcCode = '';
    };
</script>

<main class="main">
    <aside class="side-background"></aside>

    <section class="center-cards">
        <picture class="card-gray">
            <img src="./public/mobile/mobile-card-gray.svg" alt="Gray card" />
        </picture>

        <CardFront 
            cardName={cardholderName}
            {cardNumber}
            expireMonth={cardExpireDateMonth}
            expireYear={cardExpireDateYear}
        />
    </section>

<section class="side-form">
    {#if $formSubmittedStore}
        <Success handleClick={handleSuccessPage} />
    {:else}
        <form use:form class="form">
            <div class="form-name-number">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                    Cardholder Name: 
                    <div>
                        <FormInput
                            id="cardholder-name"
                            bind:value={cardholderName}
                            name="cardholderName"
                            placeholder="e.g. Jane Appleseed"
                            maxlength={27}
                            error={!!$errors.cardholderName}
                        />
                        <ValidationMessage for="cardholderName" let:messages={message}>
                            <ul class="form-message-error">
                                {#if message}
                                {#each message as error}<li>{error}</li>{/each}
                                {/if}
                            </ul>
                        </ValidationMessage>
                    </div>  
                </label>

                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                    Card Number:
                    <div>
                        <FormInput
                            id="card-number"
                            placeholder="e.g. 1234 5678 9123 0000"
                            bind:value={cardNumber}
                            maxlength={16}
                            name="cardNumber"
                            error={!!$errors.cardNumber}
                        />
                        <ValidationMessage for="cardNumber" let:messages={message}>
                            <ul class="form-message-error">
                                {#if message}
                                {#each message as error}<li>{error}</li>{/each}
                                {/if}
                            </ul>
                        </ValidationMessage>
                    </div>
                </label>
            </div>

            <div class="form-date-cvc">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                    Exp. Date (MM/YY) &nbsp; CVC <br>
                    <div class="form-date-cvc-inputs">
                        <FormInput
                            name="cardExpireDateMonth"
                            id="expire-date-mm"
                            placeholder="MM"
                            bind:value={cardExpireDateMonth}
                            maxlength={2}
                            error={!!$errors.cardExpireDateMonth}
                        />

                        <FormInput
                            name="cardExpireDateYear"
                            id="expire-date-yy"
                            placeholder="YY"
                            bind:value={cardExpireDateYear}
                            maxlength={2}
                            error={!!$errors.cardExpireDateYear}
                        />
                        
                        <FormInput
                            id="cvc"
                            placeholder="e.g. 123"
                            bind:value={cvcCode}
                            name="cvcCode"
                            error={!!$errors.cvcCode}
                            maxlength={3}
                        />
                    </div>
                    <div class="form-date-cvc-uls">    
                        <ValidationMessage
                            for="cardExpireDateMonth"
                            let:messages={message}
                        >
                            <ul class="form-message-error">
                            {#if message}
                                {#each message as error}<li>{error}</li>{/each}
                            {/if}
                            </ul>
                        </ValidationMessage>

                        <ValidationMessage
                            for="cardExpireDateYear"
                            let:messages={message}
                        >
                            <ul class="form-message-error">
                            {#if message}
                                {#each message as error}<li>{error}</li>{/each}
                            {/if}
                            </ul>
                        </ValidationMessage>

                        <ValidationMessage for="cvcCode" let:messages={message}>
                            <ul class="form-message-error">
                            {#if message}
                                {#each message as error}<li>{error}</li>{/each}
                            {/if}
                            </ul>
                        </ValidationMessage>          
                    </div>
                </label>      
            </div>

            <Button
                variant="primary"
                disabled={!$isValid}
                type="submit"
                on:submit={() => console.log("submit")}>Confirm</Button>
        </form>
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

        & input:focus {
            border-radius: 8px;
            border: 1px solid var(--border-input-color);
        }

        & .form-input-error {
            border-color: var(--border-input-error);
        }

        & .form-message-error {
            margin-top: 0.375rem;
            font-size: 0.625rem;
            line-height: normal;
            letter-spacing: normal;
            color: var(--text-error-color);
            text-transform: none;
        }

        & .form-name-number {
            display: flex;
            flex-direction: column;
        }

        & .form-name-number div {
            margin-top: 0.5625rem;
            margin-bottom: 1.25rem;
        }

        & .form-name-number input {
            padding: 0.6875rem 0 0.6875rem 1rem;
            min-width: 94%;
        }

        & .form-date-cvc {
            margin-bottom: 1.75rem;
        }

        & .form-date-cvc-inputs {
            display: flex;
            justify-content: space-between;
            gap: 0.1rem;
        }

        & .form-date-cvc-uls {
            display: flex;
        }

        & 
        .form-date-cvc-uls ul:first-child,
        .form-date-cvc-uls ul:nth-child(2) {
            flex: 0 0 23.5%;
        }

        & .form-date-cvc-uls ul:last-child {
            flex: 0 0 53%;
        }

        & .form-date-cvc input {
            margin-top: 0.5625rem;
            padding: 0.6875rem 0.875rem 0.6875rem 1rem;
            max-width: 2.2rem;
        }

        & .form-date-cvc input:last-child {
            max-width: 9rem;
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
