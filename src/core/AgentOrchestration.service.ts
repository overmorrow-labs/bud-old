import { AgentConfig, TAgentInstanceId } from './types';
import { Agent } from './Agent';

class _AgentOrchestrationService {
    private registry: Map<TAgentInstanceId, Agent>;

    constructor() {
        this.registry = new Map();
    }

    createInstance(instanceId: TAgentInstanceId, config: AgentConfig) {
        if (this.registry.has(instanceId))
            throw new Error(`Agent instance "${instanceId}" already exists.`);

        const instance = Agent.getInstance(instanceId, config);
        this.registry.set(instanceId, instance);

        return instance;
    }

    getInstance(instanceId: TAgentInstanceId): Agent {
        const instance = this.registry.get(instanceId);
        if (!instance)
            throw new Error(`Agent instance "${instanceId}" not found.`);

        return instance;
    }

    deleteInstance(instanceId: TAgentInstanceId) {
        this.registry.delete(instanceId);
    }

    listInstances(): string[] {
        return Array.from(this.registry.keys());
    }

}

export const AgentOrchestrationService = new _AgentOrchestrationService()