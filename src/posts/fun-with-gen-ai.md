---
icon: cloud
date: 2023-10-22
category:
  - Generative AI
  - ChatGPT
tag:
  - 'business'
  - 'entrepreneur'
  - 'wantrepreneur'
  - 'startups'
  - '10x'
  - 'Undercover Billionaire'
---
# Using Generative AI to Test Business Viability

## Spec / Reference

Gen Specification Model

```yaml
instruction:
  context: Automatic Context Embedding
  query: <query>
```

## Example(Generated if not inputted)

```yaml
context: <automatic>
query: <query>\n\n<Consideration1>\n<Consideration2>
```

## Considerations

| Term | Description |
| :--- | :--- |
| `businessName` | The official name of the business. |
| `businessOverview` | A brief summary of the business and its primary operations. |
| `targetAudience` | The specific group of consumers the business is aiming to reach. |
| `audiencePersonas` | A set of ideal customer personas which the `targetAudience` includes. |
| `marketSize` | The total number of potential customers or total revenue potential in the market. |
| `competition` | Other businesses that offer similar products or services. |
| `differentiation` | What makes the business unique compared to its competition. |
| `valueProposition` | The unique value the business offers to its customers. |
| `feasibility` | The practicality and potential success of the business idea. |
| `revenueModel` | How the business makes money. |
| `costStructure` | The business's major costs, and how they are distributed. |
| `profitability` | The financial gains of the business after all expenses have been deducted. |
| `serviceableObtainableMarket` | The portion of the market the business can realistically capture. |
| `pricingStrategy` | How the business sets prices for its products or services. |
| `salesAndDistributionChannels` | How the business delivers products or services to its customers. |
| `logistics` | The management of the flow of things between the point of origin and the point of consumption. |
| `marketingStrategy` | The business's comprehensive plan to reach its target audience and convert them into customers. |
| `operationalSuppliers` | The suppliers that the business relies on for its day-to-day operations. |
| `production` | The process of creating and manufacturing the business's products or services. |
| `regulatoryKeyLegalConsiderations` | Legal factors that could impact the business's operations. |
| `industryRegulations` | Rules and guidelines specific to the industry in which the business operates. |
| `technologyRequirements` | The technological needs and tools necessary for the business's operations. |
| `intellectualProperty` | The business's rights to its unique creations and innovations. |
| `teamSkillsAndExperience` | The abilities and backgrounds of the team members. |
| `advisorsAndPartnerships` | Key relationships with mentors and other businesses. |
| `identifiedRisks` | Potential issues or dangers that could impact the business. |
| `riskMitigationStrategies` | Plans to minimize the impact of identified risks. |
| `contingencyPlans` | Backup plans for when things do not go as expected. |
| `environmentalImpact` | The effect of the business on the environment. |
| `socialContribution` | The business's efforts to give back to the community. |
| `risks` | Potential threats or challenges to the business. |
| `adjacentIndustries` | Industries that are closely related to the business's industry. |
| `query` | A request for information or action. |
| `idea` | The original thought or notion that leads to a business's formation. |
| `businessModel` | The design for the successful operation of a business. |
| `consumerBehavior` | How consumers make buying decisions and what influences them. |
| `demographicCharacteristics` | Statistical data about the characteristics of a population (e.g., age, gender). |
| `earlyAcquisitionStrategy` | The plan for gaining customers when starting the business. |
| `lateAcquisitionStrategy` | The plan for gaining customers after the business has been established. |
| `revenueModels` | Different ways the business can earn revenue. |
| `operationalEquipment` | The equipment necessary for the business's operations. |
| `teamAndExpertise` | The group of people running the business and their special skills or knowledge. |
| `operationalCosts` | The costs associated with the business's day-to-day operations. |
| `hiringRoadmapAndCosts` | The plan for recruiting and the costs associated with it. |
| `vision` | The business's goals for its future. |
| `marketTrends` | Current trends in the market that are relevant to the business. |
| `competitiveLandscapeChangesOverTime` | How the competitive environment has or is expected to change. |
| `industryRegulations` | Rules established by industry associations or government bodies that the business must follow. |
| `environmentalImpact` | The effects of the business's activities on the environment. |
| `socialContribution` | The business's efforts to contribute positively to society. |
| `novelRevenueModels` | Innovative ways the business can earn revenue. |
| `marketSectorTrends` | Current trends in the specific sector of the market the business operates in. |
| `painPoints` | The problems or issues the business's product or service helps to solve. |
| `marketStrategy` | The business's plan for reaching its target market. |
| `totalAddressableMarket` | The total market demand for a product or service. |
| `whyNow` | The reasons why it is a good time to start the business. |
| `marketGrowth` | The increase in the size of the market over time. |
| `changesInConsumerPrefOrTech` | Changes in consumer preferences or technology that could impact the business. |
| `experiments` | Tests or trials carried out to validate the business's ideas or strategies. |
| `partnershipsAndCollaborations` | Relationships with other businesses or organizations that help the business. |
| `marketValueComparisonAnalysis` | An analysis comparing the business's market value to other similar businesses. |
| `marketSizeAndGrowthPotential` | The potential for growth in the market size. |
| `keyMotivatorsToPurchase` | Main factors that motivate consumers to buy the business's product or service. |
| `researchAndDiscovery` | The process of gathering information and insights about the market, consumers, and competition. |
| `strengths` | The inherent advantages of the business idea that may give it an upper hand over others. |
| `weaknesses` | The inherent disadvantages of the business idea that may place it at a disadvantage relative to others. |
| `opportunities` | External elements in the environment that the business idea could exploit to its advantage. |
| `threats` | External elements in the environment that could cause trouble for the business idea. |
| `feedbackLoop` | How the business will collect and use feedback from customers, employees, and other stakeholders. This could include methods for collecting feedback, how feedback will be analyzed, and how it will be used for continuous improvement and adaptation. |

## Initial Queries

```yaml
- Viability(creste of dep tree): `viability`
  - Name of Business
    - Inputted
  - Overview of Business
    - Inputted
  - Market Research
    - Target Audience: Who are the potential customers? What are their needs and preferences?
      - Gen if not imputed
        - query: Considering the below information, What is the target audience for this business idea: `idea`
        - idea: `businessName`, `businessOverview`
        - Market Size: How big is the potential market for the product or service?
      - Gen if not inputted
        - query: Considering the below information, How big is the potential market for this business idea: `idea`
        - idea: `businessName`, `businessOverview`
    - Competition: Who are the competitors, and what is their market share? What makes your idea different or better?
      - Gen if not inputted
        - query: Who are the competitors of the below business idea, and what is their market share? What makes this idea different or better from these competitors?: `idea`
        - idea: `businessName`, `businessOverview`
  - Product or Service
    - Value Proposition: What problem does it solve or need does it meet for customers?
      - Gen if not inputted
        - query: What is the Value Proposition in this business idea?
        - idea: `businessName`, `businessOverview`
    - Differentiation: How is it different or better than similar products or services?
      - Gen if not imputed?
        - query: How is this business idea different from or better than similar products or services?
        - idea: `businessName`, `businessOverview`
    - Feasibility: Is the idea technically and operationally feasible?
      - query: Is earning profit with this business idea technically and operationally feasible?
      - idea: `businessName`, `businessOverview`
    - Target Audience: `targetAudience`
    - Market Size: `marketSize`
    - Competition: `competition`
    - Differentiation: `differentiation`
    - Value Proposition: `valueProposition`
    - Revenue Model: `revenueModel`
  - Financials
    - Revenue Model: How will the business make money? Will it use one or more of these: sales, service fees, subscriptions, freemium, advertising, affiliate marketing, licensing, franchising, sponsorship, memberships, donations, crowdfunding, leasing, lending, commission, marketplace, data dealing, ecommerce, wholesale, dropshipping, value-added reselling, pay-as-you-go, consulting, per transaction fees, loyalty programs, service or product bundling, white labeling?
      - Gen if not inputted
        - query: Which of the following revenue models are appropriate for this business idea: sales, service fees, subscriptions, freemium, advertising, affiliate marketing, licensing, franchising, sponsorship, memberships, donations, crowdfunding, leasing, lending, commission, marketplace, data dealing, ecommerce, wholesale, dropshipping, value-added reselling, pay-as-you-go, consulting, per transaction fees, loyalty programs, service or product bundling, white labeling?
        - idea: `businessName`, `businessOverview`
    - Cost Structure: What are the estimated costs involved in producing and delivering the minimum viable product or service for this business idea?
      - query: What are the high level ballpark estimated costs involved in producing and delivering the minimum viable product or service for this business idea?
      - idea: `businessName`, `businessOverview`
    - Profitability: What are the projected profits and their timeline?
      - query: What are the high level ballpark estimated costs involved in producing and delivering the minimum viable product or service for this business idea?
      - idea: `businessName`, `businessOverview`
    - Serviceable Obtainable Market (SOM): `serviceableObtainableMarket`
      - Pricing Strategy: `pricingStrategy`
      - Revenue Model: `revenueModel`
      - Sales Channels: `salesAndDistributionChannels`
      - Logistics: `logistics`
  - Marketing & Sales
    - Marketing Strategy: What is the best marketing strategy for this business idea?
      - query: What is the best marketing strategy for this business idea?
      - idea: `businessName`, `businessOverview`
    - Sales Channels: Through which sales channels will the product be sold?
      - query: Through which sales channels will the product be sold?
      - idea: `businessName`, `businessOverview`
    - Pricing Strategy: How will the product or service be best priced to attract customers while remaining profitable?
      - query:  How will the product or service be best priced to attract customers while remaining profitable?
      - idea: `businessName`, `businessOverview`
  - Operations & Supply Chain
    - Suppliers: Who are your key vendors that supply you with materials, products, services, or equipment?
      - query:   Who are your key vendors that supply you with materials, products, services, or equipment?
      - idea: `businessName`, `businessOverview`
    - Production: What is the process of producing the good or service you're selling? What are conservative, moderate, and aggressive estimates of production capacity?
      - Gen if not imputed
        - query: What is the process of producing and scaling this product or service, what are 3 sample production capacities on a sample launch timeline?
        - idea: `businessName`, `businessOverview`
    - Logistics: How will the product be distributed to customers?
      - Gen if not imputed
        - query:  What is the process of producing this good or service and what are conservative, moderate, and aggressive estimates of - production capacity?
        - idea: `businessName`, `businessOverview`
  - Regulatory & Compliance
    - Key Legal Considerations: Are there any legal restrictions or requirements?
      - query: What are the key legal considerations with this business idea?
      - idea: `businessName`, `businessOverview`
    - Industry Regulations: Are there specific industry regulations that need to be complied with?
      - query: Are there specific industry regulations that need to be complied with related to this business idea?
      - idea: `businessName`, `businessOverview`
  - Technology
    - Technical Requirements: What technology is required to implement this idea? Are you inventing it or have you invented it? (do not consider application of existing tech invented)
      - Gen if not Inputted
        - query: What technology is required to implement this idea?
        - idea: `businessName`, `businessOverview`
    - Intellectual Property: Are there patents or trademarks involved?
      - Gen if not imported
        - query:  Are there patents or trademarks involved this idea?
        - idea: `businessName`, `businessOverview`
  - Team and Expertise
    - Skills and Experience: Does the team have the necessary skills and experience to execute the idea?
      - Gen if not imputed:
        - query: What kind of team(s) and required expertise involved to create this idea?
        - idea: `businessName`, `businessOverview`
    - Advisors and Partnerships: Are there advisors or partners who can contribute expertise toward this idea?
      - Gen if not imputed:
        - query: What appropriate advisors or partners can contribute expertise toward this idea in order to increase its success?
        - idea: `businessName`, `businessOverview`
  - Risks and Challenges
    - Identified Risks: What are the potential risks, and how can they be mitigated?
      - query: What risks can you identify in this business idea?
      - idea: `businessName`, `businessOverview`
      - All: `allFields`
    - Risk Mitigation Strategies: How do you plan to prevent the identified risks?
      - query: What is an appropriate plan to mitigate these risks for this idea?
      - idea: `businessName`, `businessOverview`
    - Risks: `risks`
    - Contingency Plans: What are the backup plans in case of mitigation fails or unidentified risks occur?
      - query: List some contingency plans to mitigate unidentified risks.
      - idea: `businessName`, `businessOverview`
    - Risks: `risks`
  - Sustainability & Social Impact
    - Environmental Impact: Does the business idea consider environmental sustainability?
      - query: Does the business idea consider environmental sustainability?
      - idea: `businessName`, `businessOverview`
    - Social Contribution: Does it have a positive impact on society or communities?
      - query: Does this business idea have positive impact on society and its communities?
      - idea: `businessName`, `businessOverview`
```

## Advanced Queries

Adjacent Industries: `adjacentIndustries`
query: Could you identify the industries that are closely related to, or have potential synergies with, this business idea? What potential opportunities and threats do these adjacent industries present?
idea: `businessName`, `businessOverview`

Business Model: `businessModel`
query: Could you elaborate on the business model for this idea, considering its ability to create, deliver, and capture value in a unique way, and its potential impact on society and communities?
idea: `businessName`, `businessOverview`

Value Proposition: `valueProposition`
query: Could you detail the unique value proposition of this business idea, considering its potential to solve customer problems and meet their needs in ways that are distinct from existing alternatives?

Customer Segments: `consumerBehavior`, `demographicCharacteristics`
query: Could you identify and describe the key customer segments for this business idea, considering their unique behaviors, needs, and demographic characteristics?

Sales and Distribution Channels: `salesAndDistributionChannels`
query: What are the optimal sales and distribution channels for this business idea, considering the target audience, product nature, and competitive landscape?

Customer Relationships: `earlyAcquisitionStrategy`, `lateAcquisitionStrategy`
query: How can this business idea establish and maintain customer relationships over time? What specific strategies might be effective in the early and later stages of the business?

Audience Personas:
query: Could you provide an odd number from 3-5 detailed descriptions of the ideal customer profiles for this business idea, including their lifestyle, preferences, and the problems that the business's product or service solves for them, and how these may evolve over time?
idea: `businessName`, `businessOverview`, `targetAudience`

Revenue Streams: `revenueModels`
query: What are some potential revenue streams for this business idea, and how might these evolve or diversify over time?

Key Resources: `operationalEquipment`, `teamAndExpertise`, `operationalSuppliers`
query: What are the key resources required for this business idea, including operational equipment, team expertise, and suppliers, and how might these needs change as the business scales?

Key Partnerships: `advisorsAndPartnerships`
query: What are the key partnerships that can support this business idea, such as advisors or other businesses, and how might these partnerships evolve over time?

Cost Structure: `costStructure`, `operationalCosts`, `hiringRoadmapAndCosts`
query: What is the cost structure for this business idea, considering operational costs, hiring roadmap and costs, and other major cost drivers?

Vision: `vision`
query: What is the long-term vision for this business idea, considering its market trends, competitive landscape changes over time, target audience, market size, serviceable obtainable market, differentiation, value proposition, industry regulations, technology requirements, environmental impact, social contribution, and team skills and experience?
idea: `businessName`, `businessOverview`
`marketTrends`, `competitiveLandscapeChangesOverTime`, `targetAudience`, `marketSize`, `serviceableObtainableMarket`, `differentiation`, `valueProposition`, `industryRegulations`, `technologyRequirements`, `environmentalImpact`, `socialContribution`, `teamSkillsAndExperience`

Novel Revenue Models: `novelRevenueModels`
query: Are there innovative revenue models that could be considered for this business idea, given its unique business model, market sector trends, and potential revenue models?
idea: `businessName`, `businessOverview`
`businessModel`, `marketSectorTrends`, `revenueModels`

User Pain Points: `painPoints`
query: What are the key pain points that this business idea addresses for its target audience? How does the product or service solve these problems in a unique or better way compared to existing solutions?
idea: `businessName`, `businessOverview`
`consumerBehavior`, `demographicCharacteristics`, `targetAudience`, `competition`, `differentiation`, `marketStrategy`, `technologyRequirements`, `identifiedRisks`

Total Addressable Market (TAM): `totalAddressableMarket`
query: What is the total addressable market for this business idea, considering its adjacent industries, demographic characteristics, target audience, competition, industry regulations, market size, pricing strategy, sales and distribution channels, and market sector trends?
idea: `businessName`, `businessOverview`
`adjacentIndustries`, `demographicCharacteristics`, `targetAudience`
, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `marketSectorTrends`

Serviceable Addressable Market (SAM): `serviceableAddressableMarket`
query: What is the serviceable addressable market for this business idea, given its total addressable market, market sector trends, adjacent industries, demographic characteristics, target audience, competition, industry regulations, market size, pricing strategy, sales and distribution channels, and competitive landscape changes over time?
idea: `businessName`, `businessOverview`
`totalAddressableMarket`, `marketSectorTrends`, `adjacentIndustries`, `demographicCharacteristics`, `targetAudience`
, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `competitiveLandscapeChangesOverTime`

Serviceable Obtainable Market (SOM): `serviceableObtainableMarket`
query: What is the serviceable obtainable market for this business idea, given its serviceable addressable market, competitive landscape changes over time, total addressable market, market sector trends, adjacent industries, demographic characteristics, target audience, competition, industry regulations, market size, pricing strategy, and sales and distribution channels?
idea: `businessName`, `businessOverview`
`serviceableAddressableMarket`, `competitiveLandscapeChangesOverTime`
`totalAddressableMarket`, `marketSectorTrends`, `adjacentIndustries`, `demographicCharacteristics`, `targetAudience`
, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `competitiveLandscapeChangesOverTime`

Strengths: `strength`
query: What are the inherent strengths of this business idea that could give it a competitive advantage in the market?
idea: `businessName`, `businessOverview`

Weaknesses: `weaknesses`
query: What are the inherent weaknesses of this business idea that could potentially hinder its success in the market?
idea: `businessName`, `businessOverview`

Opportunities: `opportunities`
query: What are the external opportunities in the market that this business idea could potentially exploit?
idea: `businessName`, `businessOverview`

Threats: `threats`
query: What are the external threats in the market that couldHere's the refined version of your queries:
idea: `businessName`, `businessOverview`

Feedback Loop: `feedbackLoop`
query: How does the business intend to construct a robust feedback loop encompassing customers, employees, and other stakeholders? How will this data be analyzed, interpreted, and integrated into the ongoing improvement and evolution of the business?
idea: `businessName`, `businessOverview`

Market Share: marketShare
query: Given the total addressable market, serviceable addressable market, and serviceable obtainable market, what is the estimated potential market share for this business idea? How does this projection take into account competition and market dynamics?
idea: `businessName`, `businessOverview`, `totalAddressableMarket`, `serviceableAddressableMarket`, `serviceableObtainableMarket`, `competition`

Why Now: `whyNow`
query: Considering current market growth, changes in consumer preferences or technology, serviceable addressable market, market sector trends, adjacent industries, demographic characteristics, target audience, competition, industry regulations, market size, pricing strategy, sales and distribution channels, and competitive landscape changes over time, why is now the optimal moment to launch this business?
idea: `businessName`, `businessOverview`
`marketGrowth`, `changesInConsumerPrefOrTech`, `serviceableAddressableMarket`, `marketSectorTrends`, `adjacentIndustries`, `demographicCharacteristics`, `targetAudience`, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `competitiveLandscapeChangesOverTime`

Experiments: `experiments`
query: Propose three hypotheses related to this business idea and design thought experiments to test them. Each experiment should include clear objectives, technical feasibility assessment, budget and resource implications, and stakeholder involvement.
idea: `businessName`, `businessOverview`, `targetAudience`, `partnershipsAndCollaborations`, `technicalRequirements`, `marketValueComparisonAnalysis`, `regulatoryKeyLegalConsiderations`, `allFields`

Market Sector Trends: `marketSectorTrends`
query: Taking into account a range of factors including the serviceable addressable market, competitive landscape changes over time, adjacent industries, demographic characteristics, target audience, competition, industry regulations, market size, pricing strategy, and sales and distribution channels, what are the key market sector trends that will shape this business?
idea: `businessName`, `businessOverview`
`serviceableAddressableMarket`, `competitiveLandscapeChangesOverTime`
`serviceableAddressableMarket`, `adjacentIndustries`, `demographicCharacteristics`, `targetAudience`, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `allFields`

Competitive Landscape Changes Over Time: `competitiveLandscapeChangesOverTime`
query: Based on the business idea and the information below, project the potential evolution of the competitive landscape, considering factors such as climate change, the theory of the technological singularity, current world issues as of the date of your training, and industry changes and disruptions as of the date of your training.
idea: `businessName`, `businessOverview`
`serviceableAddressableMarket`, `totalAddressableMarket`, `marketSectorTrends`, `adjacentIndustries`, `demographicCharacteristics`, `targetAudience`, `competition`, `industryRegulations`, `marketSize`, `pricingStrategy`, `salesAndDistributionChannels`, `technicalRequirements`,

Market Size and Growth Potential: marketSizeAndGrowthPotential
query: Based on the current market size and growth trends, what are the prospects for expansion within the industry this business operates in? What factors might influence this potential growth?
idea: `businessName`, `businessOverview`, `marketSize`, `marketGrowth`

Consumer Behavior: consumerBehavior
query: What are the key consumer behaviors relevant to this business idea, and how might they evolve over time? How could these shifts impact the business?
idea: `businessName`, `businessOverview`, `targetAudience`

Demographic Characteristics: `demographicCharacteristics`
query: What are the specific demographic characteristics of the target audience for this business idea? How do these characteristics inform the business strategy?
idea: `businessName`, `businessOverview`, `targetAudience`

Key Motivators to Purchase: keyMotivatorsToPurchase
query: Beyond the product or service itself, what are the underlying motivators that would drive the target audience to engage with this business? How does the value proposition align with these motivators?
idea: `businessName`, `businessOverview`, `targetAudience`, `valueProposition`

Research and Discovery: `researchAndDiscovery`
query: What research and discovery processes are necessary to validate and refine this business idea? How will these processes contribute to understanding of the market and the feasibility of the idea?
idea: `businessName`, `businessOverview`

Regulatory Environment: `regulatoryEnvironment`
query: Considering the nature of this business idea, what are the key regulatory aspects that need to be taken into account? How might these regulations influence the operations and strategy of the business?
idea: `businessName`, `businessOverview`, `industryRegulations`

Policy & Regulations: `policyRegulations`
query: What specific policies and regulations are likely to have a direct impact on this business idea? How should the business plan to navigate and comply with these regulations?
idea: `businessName`, `businessOverview`, `industryRegulations`

Pending regulations: `pendingRegulations`
query: Are there any impending regulations that could pose a risk or present an opportunity for this business idea? How should the business prepare for these potential changes?
idea: `businessName`, `businessOverview`, `industryRegulations`

Compliance Requirement: `complianceRequirement`
query: What specific compliance requirements need to be met for this business idea? How will these requirements influence the business operations?
idea: `businessName`, `businessOverview`, `industryRegulations`

Key success factors: `keySuccessFactors`
query: What are the key factors that will determine the success of this business idea? How do these factors relate to the business's differentiation and feasibility?
idea: `businessName`, `businessOverview`, differentiation, feasibility

Changes in Consumer Pref or Tech: `consumerPreferenceChanges`
query: Have there been any significant shifts in consumer preferences or technological advancements that could impact this business idea? If so, how can the business adapt to these changes?
idea: `businessName`, `businessOverview`, `marketTrends`

Success factors for expanding businesses: `successFactorsForExpandingBusinesses`
query: What are the key success factors for scaling this business? How do these factors align with current market growth patterns?
idea: `businessName`, `businessOverview`, `marketGrowth`

Strategic Plan to Produce the MVP: `strategicPlanToProduce`MVP
query: What is the strategic plan to create the Minimum Viable Product (MVP) for this business idea? How does this plan balance speed-to-market with delivering a product that meets customer needs?
idea: `businessName`, `businessOverview`, production

Strategic Plan to Enrich the MVP with Features: `strategicPlanToEnrichMVP`
query: Once the MVP has been established, what is the strategic plan for enhancing it with additional features? How will customer feedback and market response play a role in this process?
idea: `businessName`, `businessOverview`, production, `strategicPlanToProduceMVP`

Key Considerations For Features and Enhancements: `keyConsiderationsForFeatureEnhancements`
query: When developing new features and enhancements for the product or service, what are the key considerations? How will these factors influence the prioritization and implementation of these enhancements?
idea: `businessName`, `businessOverview`, production, `strategicPlanToProduceMVP`, `strategicPlanToEnrichMVP`

Encouraging Early Adoption: `encouragingEarlyAdoption`
query: What strategies will the business employ to encourage early adoption of its product or service? How will these strategies align with the target audience and the business's broader marketing strategy?
idea: `businessName`, `businessOverview`, `marketingStrategy`, `earlyAcquisitionStrategy`

Adoption Analytics: `adoptionAnalytics`
query: What key metrics will be used to track the adoption of the product or service? How will these metrics inform the business's growth and marketing strategies?
idea: `businessName`, `businessOverview`, `earlyAcquisitionStrategy`, `lateAcquisitionStrategy`

Hiring Roadmap and Costs: `hiringRoadmapAndCosts`
query: What is the planned hiring roadmap for this business idea, and what are the anticipated costs? How do these plans align with the business's operational needs and financial projections?
idea: `businessName`, `businessOverview`, `teamSkillsAndExperience`, `operationalCosts`

Key Expense Categories: `keyExpenseCategories`
query: What are the primary expense categories for this business idea? How do these costs factor into the overall financial plan for the business?
idea: `businessName`, `businessOverview`, `costStructure`

Estimating Costs: `estimatingOperationalCosts`
query: What are the estimated operational costs for this business idea? How do these costs align with the projected revenue and profitability of the business?
idea: `businessName`, `businessOverview`, `costStructure`, `operationalCosts`

Major Cost Factors:`majorOperationCostFactors`
query: What are the major cost factors for this business idea? How do these costs influence the business's pricing strategy and profitability calculations?
idea: `businessName`, `businessOverview`, `costStructure`, `operationalCosts`

Cash Flow: `operationCashFlow`
query: Considering both your revenue model and cost structure, what is the projected operational cash flow for this business idea? How does this cash flow projection align with the business's growth plans?
idea: `businessName`, `businessOverview`, `revenueModel`, `costStructure`, `operationalCosts`

Maintenance Costs: `maintenanceCosts`
query: Considering both your revenue model and cost structure, what is the projected operational cash flow for this business idea? How does this cash flow projection align with the business's growth plans?
idea: `businessName`, `businessOverview`, `operationalCosts`

Operational Equipment: `operationalEquipment`
query: What operational equipment is required for this business idea? How does this equipment contribute to the production and logistics of your business?
idea: `businessName`, `businessOverview`, production, logistics

Infrastructure: `operationalInfrastructure`
query: What operational infrastructure is necessary for this business idea? How does this infrastructure support your production and logistics plans?
idea: `businessName`, `businessOverview`, production, logistics

Payment Processing Considerations: `paymentProcessingConsiderations`
query: Given your revenue model, what are the payment processing considerations for this business idea? How do these considerations influence your business operations and customer experience?
idea: `businessName`, `businessOverview`, `revenueModel`

Monitoring & Maintenance: `monitoringOperationalInfrastructure`
query: What are the requirements for monitoring and maintaining the operational infrastructure for this business idea? How does this maintenance plan ensure the smooth operation of your business?
idea: `businessName`, `businessOverview`, `operationalInfrastructure`

Digital Presence: `digitalPresence`
query: What are the plans for establishing a digital presence for this business idea? How will this digital strategy support your overall marketing goals?
idea: `businessName`, `businessOverview`, `marketingStrategy`

Benefits of AI/ML Implementation: `benefitsofAIMLImplementation`
query: Considering your technology requirements, what are the potential benefits of implementing AI/ML technologies in this business idea? How could these technologies enhance your product or service delivery?
idea: `businessName`, `businessOverview`, `technologyRequirements`

Key Performance Indicators: `keyPerformanceIndicators`
query: What are the key performance indicators for this business idea? How do these KPIs align with your business model and revenue model?
idea: `businessName`, `businessOverview`, `businessModel`, `revenueModel`

Early User Acquisition Strategy: `earlyAcquisitionStrategy`
query: What is the early user acquisition strategy for this business idea? How does this strategy align with the needs and preferences of your target audience?
idea: `businessName`, `businessOverview`, `targetAudience`, `marketingStrategy`

Late game user acquisition strategy: `lateAcquisitionStrategy`
query: What is the late game user acquisition strategy for this business idea? How does this strategy build upon the early user acquisition strategy and adapt to evolving market conditions?
idea: `businessName`, `businessOverview`, `targetAudience`, `marketingStrategy`, `earlyAcquisitionStrategy`

Partnerships & Collaborations: `partnershipsAndCollaborations`
query: Considering your market size and competition, what are the potential partnerships and collaborations for this business idea? How could these relationships enhance your market position?
idea: `businessName`, `businessOverview`, `marketSize`, competition

Customer Retention: `customerRetention`
query: What are the customer retention strategies for this business idea? How will these strategies contribute to long-term customer loyalty and business growth?
idea: `businessName`, `businessOverview`, `targetAudience`, `valueProposition`

Guerilla Marketing: `guerillaMarketingIdeas`
query: Given your marketing strategy and target audience, what guerilla marketing ideas could be effective for this business idea? How could these unconventional strategies help differentiate your business in the market?
idea: `businessName`, `businessOverview`, `marketingStrategy`, `targetAudience`

Website FAQs: `websiteFaqs`
query: Considering your value proposition and target audience, what are some frequently asked questions (FAQs) that might be included on the website for this business idea? How do these FAQs address common customer inquiries and concerns?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Search Teams: `searchTerms`
query: Given your marketing strategy and digital presence, what are the optimal search terms for promoting this business idea online? How do these terms align with the interests and search behaviors of your target audience?
idea: `businessName`, `businessOverview`, `marketingStrategy`, `digitalPresence`

Facebook Post: `marketingCopyFacebookPost`
query: Given your marketing strategy and digital presence, what are the optimal search terms for promoting this business idea online? How do these terms align with the interests and search behaviors of your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Facebook Post Image: `generativeAIPromptForFacebookPostImage`
query: Can you describe an image that would be effective for a Facebook post promoting this business idea? How does this image visually represent your value proposition and appeal to your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Facebook Video Script: `marketingCopyFacebookVideoScript`
query: Can you provide a script for a Facebook video promoting this business idea? How does this script effectively communicate your value proposition and engage your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Instagram Post: `marketingCopyInstagramPosts`
query: Can you provide a draft copy for an Instagram post promoting this business idea? How does this post embody your business's brand and resonate with your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Instagram Post Image: `generativeAIPromptForInstagramPostImage`
query: Can you describe an image that would be effective for an Instagram post promoting this business idea? How does this image visually convey your business's unique value proposition and connect with your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, ``targetAudience`

Instagram Reel Script `marketingCopyInstagramReelScript`
query: Can you provide a script for an Instagram reel promoting this business idea? How does this script capture the essence of your business and engage your target audience in a dynamic format?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

TikTok Video Script: `marketingCopyTikTokVideoScript`
query: Can you provide a script for a TikTok video promoting this business idea? How does this script leverage the platform's unique features to showcase your business and attract your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Targeting Advertisement: `targetingAdvertisements`
query: Given your understanding of consumer behavior and demographic characteristics, what are the strategies for targeting advertisements for this business idea? How do these strategies maximize the effectiveness of your ad spend?
idea: `businessName`, `businessOverview`, `consumerBehavior`, `demographicCharacteristics`

Search Engine Ad Copy: `marketingCopySearchEngineAdvertisement`
query: Can you provide a draft copy for a search engine advertisement promoting this business idea? How does this ad copy effectively capture your value proposition and encourage clicks from your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

30-Second Pitch: `30SecondPitch`
query: Can you provide a 30-second pitch for this business idea? How does this pitch succinctly communicate your business's value proposition and appeal to your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

YC-Style Pitch Deck: `pitchDeck`
query: Can you provide a 30-second pitch for this business idea? How does this pitch succinctly communicate your business's value proposition and appeal to your target audience?
idea: `businessName`, `businessOverview`, `businessModel`, `marketSize`, `competition`, `differentiation`, `valueProposition`, `feasibility`, `revenueModel`, `costStructure`

Pitch Preparation and Delivery: `pitchPreparationAndDelivery`
query: What are key points to focus on during the pitch preparation and delivery for this business idea? How do these points align with your 30-second pitch and pitch deck?
idea: `businessName`, `businessOverview`, `30SecondPitch`, `pitchDeck`

Financial Performance: `financialPerformance`
query: Considering your revenue model, cost structure, and projected profitability, what's the expected financial performance for this business idea? How does this financial performance support the viability of your business?
idea: `businessName`, `businessOverview`, `revenueModel`, `costStructure`, `profitability`

Market Potential: `marketPotential`
query: Based on your market size and projected market growth, what's the market potential for this business idea? How does this market potential inform your business strategy and growth plans?
idea: `businessName`, `businessOverview`, `marketSize`, `marketGrowth`

Intellectual Property: `intellectualProperty`
query: What intellectual property considerations are relevant for this business idea? How do these considerations differentiate your business and protect your competitive advantage?
idea: `businessName`, `businessOverview`, `differentiation`

Assets: `valueOfAssets`
query: What are the key assets and their estimated value for this business idea? How do these assets contribute to your business operations and overall business value?
idea: `businessName`, `businessOverview`, `operationalEquipment`, `intellectualProperty`

Team and Talent: `teamAndTalent`
query: Who are the key team members and what specific talents do they bring to this business idea? How do these team members and their talents contribute to the success of your business?
idea: `businessName`, `businessOverview`, `teamSkillsAndExperience`

Market Growth: `marketGrowth`
query: Based on your understanding of the market size, what is the projected market growth for the industry in which this business idea operates? How does this growth potential influence your business strategy and growth plans?
idea: `businessName`, `businessOverview`, `marketSize`

Market Value Comparison Analysis: `marketValueComparisonAnalysis`
query: Given your understanding of the market size and your competition, how does the market value of this business idea compare to similar businesses in the industry? How does this comparison inform your business strategy and competitive positioning?
idea: `businessName`, `businessOverview`, `marketSize`, `competition`

Legal and Financial Consideration when Negotiating Investment Terms: `investmentTermLegalAndFinancialConsiderations`
query: When negotiating investment terms for this business idea, what are the critical legal and financial considerations? How do these considerations align with your business model and revenue model?
idea: `businessName`, `businessOverview`, `businessModel`, `revenueModel`

Advanced Metric Analysis: `advancedMetricAnalysis`
query: Given your business model, revenue model, and key performance indicators, what advanced metrics should be analyzed for this business idea? How will these metrics inform your business strategy, performance evaluation, and decision-making processes?
idea: `businessName`, `businessOverview`, `businessModel`, `revenueModel`, `keyPerformanceIndicators`

Pressed, Seed, Series A Fundraising Amounts: `fundraisingAmounts`
query: Given your market potential and financial performance, what are the projected fundraising amounts for pre-seed, seed, and Series A rounds for this business idea? How do these projections align with your growth plans and financial needs?
idea: `businessName`, `businessOverview`, `marketPotential`, `financialPerformance`

Financing Options: `financingOptions`
query: Considering your business model and revenue model, what are the potential financing options for this business idea? How do these options align with your financial strategy and growth plans?
idea: `businessName`, `businessOverview`, `businessModel`, `revenueModel`

Criteria to Identify Investors: `investorIdentificationCriteria`
query: Given your fundraising amounts and market potential, what criteria should be used to identify potential investors for this business idea? How do these criteria align with your business goals and financial strategy?
idea: `businessName`, `businessOverview`, `fundraisingAmounts`, `marketPotential`

Investor Outreach: `investorOutreachStrategies`
query: Based on your investor identification criteria and outreach methods, what strategies can be used for investor outreach for this business idea? How do these strategies align with your business goals and investor relations plan?
idea: `businessName`, `businessOverview`, `investorIdentificationCriteria`, `investorOutreachMethods`

Materials to have on hand to give to potential investors: `investorMarketingMaterials`
query: Considering your pitch deck, financial performance, and market potential, what marketing materials should be prepared to give to potential investors for this business idea? How do these materials effectively communicate your business value and growth potential?
idea: `businessName`, `businessOverview`, `pitchDeck`, `financialPerformance`, `marketPotential`

Outreach Methods: `investorOutreachMethods`
query: Given your investor identification criteria and outreach strategies, what outreach methods should be used to connect with potential investors for this business idea? How do these methods facilitate effective communication and foster strong relationships with potential investors?
idea: `businessName`, `businessOverview`, `investorIdentificationCriteria`, `investorOutreachStrategies`

Investor Concerns: `investorConcerns`
query: Considering your business model, revenue model, financial performance, and market potential, what potential concerns might investors have regarding this business idea? How can these concerns be addressed to build investor confidence?
idea: `businessName`, `businessOverview`, `businessModel`, `revenueModel`, `financialPerformance`, `marketPotential`

Business Introduction: `businessIntroduction`
query: Can you provide a succinct introduction to this business idea for potential investors or partners? How does this introduction effectively communicate your value proposition and appeal to your target audience?
idea: `businessName`, `businessOverview`, `valueProposition`, `targetAudience`

Investor Meeting Email: `investorMeetingEmail`
query: Given your business introduction, value proposition, financial performance, and market potential, can you draft an email to schedule a meeting with a potential investor for this business idea? How does this email effectively communicate your business value and create interest among potential investors?
idea: `businessName`, `businessOverview`, `businessIntroduction`, `valueProposition`, `financialPerformance`, `marketPotential`
