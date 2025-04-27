# Bud Architecture

## Client - End

### React Web App

```tsx
    // @buds/client-core
        function createDeferredPromise() {
            let res;
            const promise = new Promise((resolve) => res = resolve)


            return {
                resolve: res, promise
            }
        }

        class BudService [
            private isReady: ReturnType<typeolf createDeferredPromise>

            private sessionId: string;

            private props: any;

            constructor(props){

                this.props = props;

                // definitions
                this.isReady =  createDeferredPromise();

                this.apiService = new ApiService();

                this.messageSerive = new BudMessageService();

                this.toolCallingService = new BudClientToolCallingService();
            }

            async isReady() {
                return this.isReady.promise;
            }


            async prompt(...messages) {
                const response = await this.apiService.sendRequest(
                    {
                        url: this.props.budUrl + '/prompt', 
                        body: {
                            messages: [...messages],
                            followupMesssageId: ''
                        }, 
                        type; 'POST' 
                    })

                return await tapAndSerializeMessages(response)
            }

            async tapAndSerializeMessages(messageResonse) {

                // client side tool calling
                if(messageResonse.type === 'tools_call') {
                    
                    const toolCallResponse = this.toolCallingService.call(messageResonse.tools)
                    
                    //  tools chaining 
                    if(toolCallResponse)
                        return await this.prompt([{
                            messageId: messageResponse.id,
                            mesage_type: "client_tools_call_response", 
                            tools_resposne: toolCallResponse,
                        }])
                }

                return serialize(messageResponse)
            }


            async streamSubscription() {

            }

            private callTool() {

            }


        ]


    // @buds/client-core - consumer
        const budService = BudService({
            budUrl: 'https://dispatcher.bud.com/bud-service-endpong?bud-app-id=2q34nn234',
            tools: [{
                title: 'Theme Switcher',
                description: `It will change the apps theme, based on the given list of theme
                    Available Themes
                    1. Dark Theme
                    2. Light Theme
                    3. System Theme

                    It's just an action and it returns nothing.
                `,
                parameters: zod.object({
                    theme: zod.array(['dark', 'light', 'system']).required()
                }),
                callback: (props: {theme: 'dark' | 'light' | 'system'}) => {
                    store.appearance.changeTheme(theme)
                }
            }]
        })

        await budService.init();


    // @buds/client-react-web
        const BudChatClient = ({ budService, ...otherOptions }: { budService: BudService, ...otherOptions: any[] }) => {

            const { messages } = useBudStream();


            // paint
            return <ChatProvider>
                <div>
                <h1>Chat bot</h1>
                <div classname="messages">
                    {messages.map({user, message} => (
                        <div>
                            <span>
                            {user}
                            </span>
                            <span>
                            {message}
                            </span>
                        </div>
                    ))}
                </div>
                <button>send</button>
                </div>
            </ChatProvider>
        }


    // @buds/client-react-web - consumer
        <BudChatClient
            budService={budService}
        >

```
