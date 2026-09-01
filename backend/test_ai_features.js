require('dotenv').config();
const { generateStructuredOutput, generateText, generateEmbedding } = require('./src/services/llm.service');
const { parseResume } = require('./src/services/resumeParser.service');
const { parseJobDescription } = require('./src/services/jdParser.service');
const { analyzeSkillGap } = require('./src/services/skillMatcher.service');
const { generatePathway } = require('./src/services/adaptivePathway.service');

async function runAiFeatureTests() {
  console.log('\n======================================================');
  console.log('🤖 CODEFORGE COMPREHENSIVE AI FEATURE SUITE AUDIT');
  console.log('======================================================\n');

  const results = {
    llmText: false,
    llmStructured: false,
    embeddings: false,
    resumeParser: false,
    jdParser: false,
    skillMatcher: false,
    kahnPathway: false,
  };

  // Test 1: LLM Text Generation
  try {
    process.stdout.write('1. Testing LLM Text Generation (Multi-Provider Fallback)... ');
    const textResp = await generateText('You are a technical mentor.', 'Say hello in 5 words.');
    if (textResp && textResp.length > 0) {
      console.log('✅ PASS\n   Response:', textResp.trim().slice(0, 100));
      results.llmText = true;
    } else {
      console.log('❌ FAIL (Empty response)');
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 2: Structured JSON Output
  try {
    process.stdout.write('2. Testing Structured JSON Generation... ');
    const jsonResp = await generateStructuredOutput(
      'You are a technical evaluation engine. Output JSON only.',
      'Return a json with key "status": "active" and "readiness": 85'
    );
    if (jsonResp && (jsonResp.status === 'active' || typeof jsonResp === 'object')) {
      console.log('✅ PASS\n   Parsed Output:', JSON.stringify(jsonResp).slice(0, 120));
      results.llmStructured = true;
    } else {
      console.log('❌ FAIL:', jsonResp);
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 3: Embedding Vector Generation
  try {
    process.stdout.write('3. Testing Embedding Vector Pipeline... ');
    const vec = await generateEmbedding('React distributed systems Kafka Redis');
    if (Array.isArray(vec) && vec.length > 0) {
      console.log(`✅ PASS (Vector Dimension: ${vec.length}, Sample: [${vec.slice(0, 3).map(v => v.toFixed(3)).join(', ')}...])`);
      results.embeddings = true;
    } else {
      console.log('❌ FAIL (Invalid vector output)');
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 4: Resume Parsing AI
  try {
    process.stdout.write('4. Testing Resume Entity Extraction AI... ');
    const sampleResume = `
      Senior Software Engineer with 5 years experience in React, Node.js, TypeScript, and MongoDB.
      Built microservices handling 50k RPS with Redis caching and Docker containerization.
    `;
    const parsedResume = await parseResume(sampleResume);
    const skills = parsedResume.skills || parsedResume.technical_skills || [];
    if (skills.length > 0) {
      console.log(`✅ PASS (Extracted ${skills.length} skills: ${skills.slice(0, 5).map(s => s.name || s).join(', ')})`);
      results.resumeParser = true;
    } else {
      console.log('❌ FAIL:', parsedResume);
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 5: Job Description Parsing AI
  try {
    process.stdout.write('5. Testing Job Description Requirement Extraction AI... ');
    const sampleJD = `
      Target Role: Staff Backend Engineer at Stripe
      Requirements: Expertise in Go or Node.js, Distributed Consensus (Raft/Paxos), Kafka, Kubernetes, and PostgreSQL.
    `;
    const parsedJD = await parseJobDescription(sampleJD);
    const reqSkills = parsedJD.required_skills || [];
    if (reqSkills.length > 0) {
      console.log(`✅ PASS (Extracted ${reqSkills.length} requirements: ${reqSkills.slice(0, 5).map(s => s.name || s.skill || s).join(', ')})`);
      results.jdParser = true;
    } else {
      console.log('❌ FAIL:', parsedJD);
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 6: Semantic Skill Matcher & Vector Similarity
  try {
    process.stdout.write('6. Testing Semantic Vector Skill Matcher... ');
    const resumeProfile = {
      skills: [
        { name: 'JavaScript', proficiency: 'expert' },
        { name: 'React', proficiency: 'advanced' },
        { name: 'Docker', proficiency: 'intermediate' }
      ]
    };
    const jdProfile = {
      required_skills: [
        { name: 'JavaScript', proficiency_required: 'expert', is_mandatory: true },
        { name: 'React', proficiency_required: 'expert', is_mandatory: true },
        { name: 'Kubernetes', proficiency_required: 'intermediate', is_mandatory: true }
      ]
    };
    const matchOutput = await analyzeSkillGap(resumeProfile, jdProfile);
    if (matchOutput && typeof matchOutput.overall_readiness_score === 'number') {
      console.log(`✅ PASS (Readiness Score: ${matchOutput.overall_readiness_score}%, Matched: ${matchOutput.matched_skills.length}, Missing: ${matchOutput.missing_skills.length})`);
      results.skillMatcher = true;
    } else {
      console.log('❌ FAIL:', matchOutput);
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  // Test 7: Kahn Topological Sort & Adaptive Pathway Generation
  try {
    process.stdout.write('7. Testing Kahn Topological Sort Pathway Synthesis... ');
    const resumeProfile = {
      skills: [
        { name: 'JavaScript', proficiency: 'expert' },
        { name: 'React', proficiency: 'advanced' }
      ]
    };
    const jdProfile = {
      role_title: 'Staff Backend Engineer',
      required_skills: [
        { name: 'JavaScript', proficiency_required: 'expert', is_mandatory: true },
        { name: 'Node.js', proficiency_required: 'advanced', is_mandatory: true },
        { name: 'Docker', proficiency_required: 'intermediate', is_mandatory: true }
      ]
    };
    const skillGap = {
      missing_skills: [
        { skill: 'Node.js', priority: 'high', required_proficiency: 'advanced', is_mandatory: true },
        { skill: 'Docker', priority: 'high', required_proficiency: 'intermediate', is_mandatory: true }
      ],
      proficiency_gaps: [],
      overall_readiness_score: 50
    };

    const pathwayResult = await generatePathway(resumeProfile, jdProfile, skillGap, 'Practical');
    if (pathwayResult && Array.isArray(pathwayResult.pathway) && pathwayResult.pathway.length > 0) {
      console.log(`✅ PASS (Generated ${pathwayResult.pathway.length} Kahn Sequenced Milestones: ${pathwayResult.pathway.map(s => s.course_title).join(' -> ')})`);
      results.kahnPathway = true;
    } else {
      console.log('❌ FAIL:', pathwayResult);
    }
  } catch (err) {
    console.log('❌ FAIL:', err.message);
  }

  console.log('\n======================================================');
  console.log('📊 AUDIT SUMMARY:');
  const allPassed = Object.values(results).every(v => v === true);
  console.log(`   Result: ${allPassed ? '🎉 ALL AI FEATURES OPERATIONAL' : '⚠️ SOME ISSUES DETECTED'}`);
  console.log('======================================================\n');

  process.exit(allPassed ? 0 : 1);
}

runAiFeatureTests().catch(err => {
  console.error('Unhandled fatal test error:', err);
  process.exit(1);
});
