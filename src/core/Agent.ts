// core/agent-factory.ts

import { AgentConfig } from "./types";

export class Agent {
  // statics
  static getInstance(instanceId: string, config: AgentConfig) {
    return new Agent(instanceId, config);
  }

  // main
  private instanceId: string;

  private config: AgentConfig;

  private constructor(instanceId: string, config: AgentConfig) {
    this.instanceId = instanceId;
    this.config = config;
  }

  getInstanceId() {
    return this.instanceId;
  }

  getConfig() {
    return this.config;
  }

  async ask(input: string): Promise<string> {
    return `[${this.instanceId}] ${this.config.context} → ${input}`;
  }
}
