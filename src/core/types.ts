// core/types.ts

export interface AgentConfig {
    context: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools?: any[];
    model: string;
    connection: {
        endpoint: string;
        apiKey?: string;
    };
}


export type TAgentInstanceId = string;