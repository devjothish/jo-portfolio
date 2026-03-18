// ============================================
// DATA.JS - All portfolio content and data
// ============================================

const PORTFOLIO_DATA = {
  personal: {
    name: "Jothiswaran Arumugam",
    title: "AI Engineer",
    tagline: "Building production AI systems that think, act, and scale",
    email: "arumugam.jothiswaran@gmail.com",
    phone: "(850) 825-8185",
    location: "Tallahassee, FL - Open to Relocate",
    github: "https://github.com/devjothish",
    linkedin: "https://linkedin.com/in/jothiswaran",
    bio: `I've spent the last 4+ years at RevStar turning client problems into working AI systems. Healthcare claims processing, video analysis at scale, agents that talk to databases so people don't have to write SQL - that kind of thing. 25+ engagements across healthcare, fintech, and logistics. I also have 13 cloud certs (6 AWS, 7 GCP) because I like understanding what's running under my code.`,
    cta: `I'm looking for my next AI Engineering role. If your team is working on AI and you need someone who's shipped real systems to real users, I'd love to hear about it.`,
  },

  projects: [
    {
      id: "healthcare-mesh",
      name: "Healthcare Agentic Mesh",
      shortName: "Agentic Mesh",
      description:
        "Healthcare claims are messy - dozens of validation steps, routing rules, and edge cases. I built a multi-agent system where 6 specialized agents handle the entire pipeline autonomously, from intake to adjudication, with no human in the loop.",
      tech: [
        "Strands Agents SDK",
        "AWS Bedrock AgentCore",
        "Claude Sonnet",
        "ECS Fargate",
        "CDK",
        "Python",
      ],
      metrics: [
        { label: "Agents Orchestrated", value: 6, suffix: "" },
        { label: "Processing Time", value: 85, suffix: "% faster" },
        { label: "Accuracy", value: 97, suffix: "%" },
      ],
      impact: 95,
      color: "#00D4FF",
      icon: "mesh",
    },
    {
      id: "video-brief",
      name: "Multimodal Video-to-Brief",
      shortName: "Video-to-Brief",
      description:
        "A client had thousands of brand videos and needed structured briefs for each one. I built a pipeline that watches videos with Amazon Nova Pro, extracts key information, and generates briefs - then fine-tuned Llama 3.1 8B with QLoRA so the whole thing costs almost nothing to run.",
      tech: [
        "Amazon Nova Pro",
        "QLoRA",
        "Llama 3.1 8B",
        "SageMaker",
        "Python",
      ],
      metrics: [
        { label: "Briefs Generated", value: 3867, suffix: "" },
        { label: "Cost Reduction", value: 72, suffix: "x" },
        { label: "Fine-tune Params", value: 0.5, suffix: "%" },
      ],
      impact: 90,
      color: "#8B5CF6",
      icon: "video",
    },
    {
      id: "transaction-ai",
      name: "AI Transaction Categorization",
      shortName: "Transaction AI",
      description:
        "The original system was calling an LLM for every single transaction - expensive and slow. I added long-term memory so the agent remembers past categorizations and takes a fast path when it's seen something similar. Went from 8.3s to 1.2s per transaction and slashed costs by 93%.",
      tech: [
        "Bedrock AgentCore",
        "AgentCore LTM",
        "Haiku 4.5",
        "DynamoDB",
        "Lambda",
      ],
      metrics: [
        { label: "Cost Reduction", value: 93, suffix: "%" },
        { label: "Fast-path Hit Rate", value: 89, suffix: "%" },
        { label: "Latency", value: 120, suffix: "ms" },
      ],
      impact: 88,
      color: "#10B981",
      icon: "transaction",
    },
    {
      id: "text2sql",
      name: "Text2SQL Analytics Agent",
      shortName: "Text2SQL Agent",
      description:
        "Business teams shouldn't need to learn SQL to get answers from their data. I built an agent that takes plain English questions, writes Redshift SQL, and returns results - with guardrails to prevent SQL injection and PII leaks. Works across a 50+ column schema.",
      tech: [
        "Claude Sonnet",
        "Bedrock AgentCore",
        "Amazon Redshift",
        "API Gateway",
        "CDK",
      ],
      metrics: [
        { label: "Latency Reduction", value: 70, suffix: "%" },
        { label: "Schema Columns", value: 50, suffix: "+" },
        { label: "Query Accuracy", value: 94, suffix: "%" },
      ],
      impact: 85,
      color: "#F59E0B",
      icon: "sql",
    },
    {
      id: "data-discovery",
      name: "Data Discovery Platform",
      shortName: "Data Discovery",
      description:
        "Companies lose track of their own data. I built a platform where teams can search, browse, and understand data assets across the organization - think Google for your internal data. React frontend, Python backend, all running on AWS.",
      tech: [
        "React",
        "Python",
        "AWS Amplify",
        "S3",
        "Glue",
        "Athena",
        "Lake Formation",
      ],
      metrics: [
        { label: "Data Sources", value: 25, suffix: "+" },
        { label: "Search Speed", value: 200, suffix: "ms" },
        { label: "Users Served", value: 500, suffix: "+" },
      ],
      impact: 75,
      color: "#EC4899",
      icon: "data",
    },
    {
      id: "voice-ai",
      name: "Voice AI Agent",
      shortName: "Voice AI",
      description:
        "A logistics startup was locked into an expensive voice AI vendor. I replaced it with a modular pipeline - speech-to-text, LLM reasoning, text-to-speech - all composable and swappable. Real-time conversations with sub-second response times over LiveKit.",
      tech: [
        "LiveKit",
        "React",
        "AWS Amplify",
        "Python",
        "WebRTC",
        "LLM Pipeline",
      ],
      metrics: [
        { label: "Response Time", value: 800, suffix: "ms" },
        { label: "Concurrent Calls", value: 50, suffix: "+" },
        { label: "Uptime", value: 99.5, suffix: "%" },
      ],
      impact: 70,
      color: "#6366F1",
      icon: "voice",
    },
  ],

  skills: {
    "AI / ML": [
      { name: "Strands Agents SDK", level: 95 },
      { name: "AWS Bedrock AgentCore", level: 95 },
      { name: "LangGraph", level: 90 },
      { name: "LangChain", level: 90 },
      { name: "QLoRA Fine-tuning", level: 85 },
      { name: "RAG Pipelines", level: 92 },
      { name: "RAGAS Evaluation", level: 85 },
      { name: "Prompt Engineering", level: 95 },
      { name: "Claude / GPT / Llama", level: 93 },
      { name: "Amazon Nova Pro", level: 88 },
      { name: "SageMaker", level: 85 },
      { name: "Hugging Face", level: 82 },
    ],
    Cloud: [
      { name: "AWS CDK", level: 92 },
      { name: "ECS Fargate", level: 88 },
      { name: "Lambda", level: 90 },
      { name: "API Gateway", level: 88 },
      { name: "DynamoDB", level: 87 },
      { name: "S3 / Glue / Athena", level: 85 },
      { name: "GCP Cloud Run", level: 80 },
      { name: "BigQuery", level: 78 },
      { name: "CloudFormation", level: 82 },
      { name: "Terraform", level: 75 },
    ],
    Backend: [
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 88 },
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 78 },
      { name: "Docker", level: 85 },
      { name: "REST APIs", level: 92 },
      { name: "GraphQL", level: 75 },
    ],
    Frontend: [
      { name: "React", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "HTML/CSS", level: 85 },
      { name: "Three.js", level: 70 },
      { name: "AWS Amplify", level: 80 },
    ],
  },

  certifications: {
    AWS: [
      {
        name: "Solutions Architect Professional",
        short: "SA Pro",
        tier: "professional",
      },
      {
        name: "GenAI Developer Professional",
        short: "GenAI Pro",
        tier: "professional",
      },
      { name: "ML Specialty", short: "ML Spec", tier: "specialty" },
      {
        name: "Developer Associate",
        short: "Dev Assoc",
        tier: "associate",
      },
      {
        name: "ML Associate",
        short: "ML Assoc",
        tier: "associate",
      },
      {
        name: "Data Engineer Associate",
        short: "DE Assoc",
        tier: "associate",
      },
    ],
    GCP: [
      {
        name: "Professional ML Engineer",
        short: "ML Eng",
        tier: "professional",
      },
      {
        name: "Professional Cloud Architect",
        short: "Architect",
        tier: "professional",
      },
      {
        name: "Professional Data Engineer",
        short: "Data Eng",
        tier: "professional",
      },
      {
        name: "Professional Cloud Developer",
        short: "Developer",
        tier: "professional",
      },
      {
        name: "Professional DevOps Engineer",
        short: "DevOps",
        tier: "professional",
      },
      {
        name: "Professional Database Engineer",
        short: "DB Eng",
        tier: "professional",
      },
      {
        name: "Associate Cloud Engineer",
        short: "ACE",
        tier: "associate",
      },
    ],
  },

  experience: [
    {
      role: "Data and AI Engineer - Tech Lead",
      company: "RevStar Consulting (AWS Advanced Tier Partner)",
      period: "Jun 2025 - Present",
      location: "Tampa, FL (Remote)",
      highlights: [
        "Ran point on 25+ client engagements - scoping architectures, estimating AWS costs, and building the AI systems myself. RAG pipelines, agentic workflows, fine-tuning - whatever the client needed.",
        "Built an 8-step healthcare claims pipeline where agents handle everything from intake to adjudication. Strands Agents SDK, Bedrock AgentCore, deployed on ECS Fargate.",
        "Took video processing from $0.37/video down to $0.005 (72x cheaper) by building a multimodal pipeline with Nova Pro. Processed 3,867 brand videos and fine-tuned Llama 3.1 8B on 8x A100s.",
        "Latency was 8.3 seconds per transaction - way too slow. Added dual-namespace long-term memory so the agent remembers past work. Got it down to 1.2s and cut costs by 93%.",
        "Non-technical teams needed data answers without writing SQL. Built an agent with Claude Sonnet that handles 50+ column schemas, with injection prevention and PII guardrails baked in.",
      ],
    },
    {
      role: "AI Engineer (Co-op)",
      company: "IM Digital",
      period: "May 2024 - May 2025",
      location: "Boca Raton, FL (Remote)",
      highlights: [
        "Built RAG pipelines on Qdrant with hybrid vector search - sub-300ms retrieval serving 1K+ queries a day for legal and product teams.",
        "Fine-tuned LLaMA and Mistral with LoRA/QLoRA on Vertex AI. Generation got 37% more accurate and token costs dropped 35%.",
        "Shipped multi-agent LLM APIs on Cloud Run with FastAPI. Added RBAC, rate limiting, and Prometheus/Grafana so we could actually monitor what the agents were doing.",
        "Hallucinations were a real problem. Set up CI/CD-driven eval with LangSmith and RAGAS - grounding scores improved 62%.",
      ],
    },
    {
      role: "GCP Cloud Engineer",
      company: "Cognizant (CTS)",
      period: "Mar 2021 - Aug 2023",
      location: "Hyderabad, India",
      highlights: [
        "Teams were spending days spinning up ML infrastructure. Automated it with Terraform, GKE, and BigQuery - setup time dropped 80% across 15+ projects.",
        "ML models kept missing SLAs. Rebuilt the serving layer with Vertex AI pipelines and optimized Dataflow ETL. SLA adherence improved 60%.",
        "Mentored 30+ engineers on GCP and ML infra best practices. Helped the org move from on-prem mindset to cloud-native.",
      ],
    },
  ],

  education: {
    degree: "Master of Science in Computer Science",
    school: "Florida State University",
    gpa: "3.72/4.0",
    period: "Aug 2023 - May 2025",
    location: "Tallahassee, FL",
  },
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
