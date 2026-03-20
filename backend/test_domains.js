// Set dummy API keys to avoid client init errors
process.env.OPENAI_API_KEY = 'dummy';
process.env.GROQ_API_KEY = 'dummy';
process.env.GEMINI_API_KEY = 'dummy';
process.env.LLM_PROVIDER = 'mock';

// Mock the LLM service entirely
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function() {
  const arg = arguments[0];
  if (arg.includes('llm.service')) {
    return {
      callLLMStructured: async () => ({
        enriched_steps: [],
        weekly_schedule: {},
        overall_coaching_note: "Mocked coaching note for testing."
      }),
      callLLMText: async () => "Mocked text response.",
      getEmbedding: async () => Array(1536).fill(0),
      getEmbeddingsBatch: async (texts) => texts.map(() => Array(1536).fill(0))
    };
  }
  return originalRequire.apply(this, arguments);
};

const { generateAdaptivePathway } = require('./src/services/adaptivePathway.service');

async function testDomain(name, resumeSkills, jdSkills, jdRole) {
  console.log(`\n--- TESTING DOMAIN: ${name} ---`);
  
  const resumeProfile = {
    name: `Test ${name} Candidate`,
    skills: resumeSkills.map(s => ({ skill: s, proficiency: 'intermediate' })),
    seniority_level: 'mid-level',
    domains: [name.toLowerCase()]
  };

  const jdProfile = {
    role_title: jdRole,
    required_skills: jdSkills.map(s => ({ skill: s, required_level: 'advanced', priority: 'high' })),
    seniority: 'senior'
  };

  const skillGap = {
    missing_skills: jdSkills
      .filter(s => !resumeSkills.map(rs => rs.toLowerCase()).includes(s.toLowerCase()))
      .map(s => ({ skill: s, priority: 'high' })),
    proficiency_gaps: [],
    overall_readiness_score: 50
  };

  try {
    const roadmap = await generateAdaptivePathway(resumeProfile, jdProfile, skillGap);
    console.log(`[SUCCESS] Generated ${roadmap.pathway.length} steps for ${name}.`);
    
    if (roadmap.pathway.length > 0) {
      roadmap.pathway.forEach(step => {
        console.log(`  - Step ${step.sequence}: ${step.course_title} (${step.estimated_hours}h)`);
      });
    } else {
      console.warn(`[WARN] No courses found for ${name}. Check your skill matching logic.`);
    }
  } catch (err) {
    console.error(`[ERROR] ${name} test failed:`, err.stack);
  }
}

async function runAllTests() {
  console.log("Starting End-to-End Domain Validation...");
  
  // 1. HR Test
  await testDomain(
    'HR',
    ['Diversity Training'],
    ['Diversity Training', 'Talent Acquisition', 'HR Analytics'],
    'HR Lead'
  );

  // 2. Sales Test
  await testDomain(
    'Sales',
    ['Cold Calling'],
    ['Cold Calling', 'Salesforce', 'Enterprise Sales'],
    'Senior AE'
  );

  // 3. Marketing Test
  await testDomain(
    'Marketing',
    ['SEO Basics'],
    ['SEO Basics', 'Google Ads', 'GA4', 'Growth Hacking'],
    'Marketing Manager'
  );
  
  console.log("\n--- TEST SUITE COMPLETE ---");
}

runAllTests();
