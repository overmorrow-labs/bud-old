
```tsx
// buddy/buds/mathemetical.buds.ts

import { createBud, } from "@buds/client-core";
import z from "zod";

// buds creation - buds are nothing but a tool for llm
const calculatorBud = createBud({
  name: "calculate",
  description: "Perform a mathematical calculation",
  parameters: z.object({
    expression: z
      .string()
      .describe("The mathematical expression to evaluate, e.g. (2 + 2) * 3"),
  }),
  execute: async (args) => {
    try {
      // Using Function is still not ideal for production but safer than direct eval
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${args.expression}`)();
      return { result };
    } catch (e) {
      // Properly use the error variable
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Invalid expression: ${args.expression}. Error: ${errorMessage}`
      );
    }
  },
});

const regressionBud = createBud({
  name: "regression",
  description: "Perform a regression mathematical calculation",
  parameters: z.object({
    expression: z
      .string()
      .describe("The mathematical expression to evaluate, e.g. (2 + 2) * 3"),
  }),
  execute: async (args) => {
    try {
      // Using Function is still not ideal for production but safer than direct eval
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${args.expression}`)();
      return { result };
    } catch (e) {
      // Properly use the error variable
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Invalid expression: ${args.expression}. Error: ${errorMessage}`
      );
    }
  },
});

const mathameticalBuds = [calculatorBud, regressionBud];

return mathameticalBuds;

```

```tsx

// buddy/sas/index.ts
const sa1 = createSkilledAgent({
    agentId: 'stable-diffuser-1.00',
    title, 
    descritption
    buds: [mathemeticalBuds, /* other buds goes here */],
})

const sa2 = createSkilledAgent({
    agentId: 'text-analyser-1.00',
    title, 
    descritption
    buds: [mathemeticalBuds, /* other buds goes here */],
})



return [sa1, sa2]




```


```tsx

// buddy/bud.config.ts

import { createBudClient,createSkilledAgent, } from "@buds/client-core";
import buds from './buds';
import sas from './sas';


// create bud client - 
// a root service responsible for all operations in bud
const budClient = createBudClient({
  // obtain from bud-console (deployment / shared console)
  serviceEndpoint: "https://consumer.buds.com/service", // shared service endpoint
  // serviceEndpoint: "https://api.egain.com/v2/budclient", // custom deployment url
  appId: "asd-1233-234-1234",

  sas,
  buds,

  title, 
  description,
});

export default budClient;


```


```tsx
// App.tsx
import { BudChatClient } from '@buds/client-react-web';
import budClient from './buds/bud.config.ts';

const App = () => {

    useEffect() {
        budClient.init();
    }, []);


    return <>
        <div> My Sass Platoform </div>
        <BudChatClient budClient={budClient} type='floating' floatingConfig={{}} />
    </>
}


```



# Bud Console

1. Create bud app
   * Name
   * Description
   * Model setup
     * Shared models
       * Pricing model 
         * No of prompts for MA
         * No of prompts x No of SA used
         * Each SA will be having different weights for different prompts (token)
       * Master Agent - mistral-7b - big horizontally scale instance
         * it'll share the one big master agent running for this ecosystem
         * base on some quota or rate limitation
       * Skilled Agents
         * llma-1.0  - big horizontally scale instance
           * it'll share the one big master agent running for this ecosystem
           * base on some quota or rate limitation
         * mistral-1.0 x 5  - big horizontally scale instance
           * it'll share the one big master model running for this ecosystem
           * it'll share the one big master model running for this ecosystem
         * stable-diffusion-4a x 5  - big horizontally scale instance
           * it'll share the one big master model running for this ecosystem
           * it'll share the one big master model running for this ecosystem
     
     * Dedicated models 
       * Pricing model - 
         * They will pay for the all the resources both MA and SAs 
         * Platform or Service Fee)
       * Choose Master Agent
         * Capable of orchestrating entier stuff efficiently
         * Including the tool calls
         * For now - Master agent can't be tweaked Manually 
         * You can configure the resoruce for the base agent
           * you can downgrade below the basic requirement 
           * Basic requirement - $20 - 4vcpu 8GB RAM
       * skilled Agents
         * skilled agent - 1
           * Specific for tasks
           * Pick from available 
           * configure resource
         * skilled agent - 2
           * Specific for tasks
           * Pick from available 
           * configure resource

2. Created bud-app console
   * Name of the bud-app created
   * It lists all models provisoned with tag
     * Master agent - MA
     * Skilled agents
       * SA-1 (copy)
       * SA-2 (copy)
       * SA-3 (copy)
   * Methods to connect / consume the bud-app
     * web
         ```tsx
            <!-- yarn add @buds/client-core -->
            <!-- yarn add @buds/client-react-web -->

            import { createBudClient } from '@buds/client-core';
            
            // setup
            const budClient = createBudClient({
                serviceEndpoint: "https://consumer.buds.com/service",
                appId: "asd-1233-234-1234",
            })

            // init
            budClient.init() // promisable


            // consume (react)
            // App.tsx
            import { BudChatClient } from '@buds/client-react-web';
            import budClient from './buds/bud.config.ts';

            const App = () => {

                useEffect() {
                    budClient.init();
                }, []);


                return <>
                    <div> My Sass Platoform </div>
                    <BudChatClient budClient={budClient} type='floating' floatingConfig={{}} />
                </>
            }
        ```
     * mobile