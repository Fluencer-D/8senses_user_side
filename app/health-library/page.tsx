"use client"
import type React from "react"
import { useState } from "react"
import Navbar from "../components/navbar/page"
import Consultation from "../components/consultation/page"
import Footer from "../components/footer/page"
import type { StaticImageData } from "next/image"
import Banner from "../components/CommonBanner/Banner"
import HealthBanner from "@/public/HealthBanner.png"
// import { healthLibrary } from "../lib/health-library"

interface Disease {
  _id: string
  name: string
  description: string
  symptoms: string[]
  causes: string
  diagnosis: string
  treatments: string
  preventions?: string
  category: string
  ageGroup: string[]
  featuredImage?: string
  slug: string
}

export const healthLibrary: Record<string, string> = {
  "ADHD (Attention Deficit Hyperactivity Disorder)":
    "How occupational and speech therapy help children with ADHD improve focus, executive functioning, and communication skills.",
  "Apraxia of Speech":
    "A motor speech disorder where children have difficulty planning and coordinating movements needed for speech.",
  "Auditory Processing Disorder (APD)": "Therapy approaches to improve how a child processes and interprets sounds.",
  "Balance and Coordination":
    "Occupational therapy exercises to help children improve their balance and coordination for activities like walking, running, or climbing.",
  "Behavioral Therapy":
    "How occupational therapists work with children to address behaviors related to sensory processing or self-regulation challenges.",
  "Bayley Scales of Development":
    "A developmental assessment used to evaluate cognitive, language, and motor development in infants and toddlers.",
  "Cerebral Palsy (CP)":
    "Occupational and speech therapy strategies for improving motor skills, communication, and independence in children with CP.",
  "Cognitive Skills":
    "How therapy supports cognitive development, including problem-solving, memory, and decision-making abilities.",
  "Communication Delays": "Early intervention strategies for children with delayed language and communication skills.",
  "Developmental Coordination Disorder (DCD)":
    "How occupational therapy helps children with DCD improve motor planning and execution for tasks like dressing, writing, and playing.",
  Dysarthria:
    "Speech therapy techniques to improve speech clarity in children with muscle weakness affecting their speech.",
  Dyslexia:
    "The role of speech therapy in helping children with dyslexia improve reading, phonological awareness, and language processing.",
  "Early Intervention":
    "The importance of providing occupational and speech therapy to infants and toddlers to address developmental delays as soon as possible.",
  "Expressive Language Disorder":
    "How speech therapy helps children express themselves more effectively through verbal and nonverbal communication.",
  "Feeding Therapy":
    "Occupational and speech therapy techniques to help children who have difficulty eating due to sensory issues, motor challenges, or oral motor delays.",
  "Fine Motor Skills":
    "Activities and exercises designed to improve a child's hand-eye coordination, dexterity, and ability to manipulate small objects.",
  "Gross Motor Skills":
    "How occupational therapy supports the development of large muscle movements like walking, jumping, and throwing.",
  "Global Developmental Delay (GDD)":
    "How therapists assess and provide treatment plans for children with delays across multiple developmental areas.",
  "Handwriting Difficulties":
    "Occupational therapy techniques to improve pencil grasp, letter formation, and legibility in children struggling with handwriting.",
  "Hearing Loss":
    "The role of speech therapy in helping children with hearing loss develop communication skills and auditory processing.",
  "Intellectual Disabilities":
    "Therapy strategies to help children with intellectual disabilities improve functional skills, communication, and independence.",
  Interoception:
    "How occupational therapy helps children become aware of internal body signals (e.g., hunger, thirst, bathroom needs) to improve self-regulation.",
  "Joint Attention":
    "Speech therapy activities to improve a child's ability to share focus with others during communication or play.",
  Kinesiology:
    "How understanding movement science (kinesiology) helps occupational therapists design effective motor skill interventions for children.",
  "Language Delays":
    "How speech therapy addresses delayed language development in young children, focusing on receptive and expressive skills.",
  "Low Muscle Tone (Hypotonia)":
    "Occupational therapy strategies to strengthen muscles and improve coordination in children with low muscle tone.",
  "Milestone Delays":
    "How early therapy interventions can help children who are behind in key developmental milestones, such as sitting, walking, or speaking.",
  "Motor Planning (Dyspraxia)":
    "How occupational therapy supports children with motor planning challenges by teaching them how to sequence and execute physical movements.",
  "Neurological Disorders":
    "How occupational and speech therapy help children with neurological disorders like autism, cerebral palsy, and epilepsy to improve function and communication.",
  "Nonverbal Communication":
    "Speech therapy strategies for children who are nonverbal to develop alternative communication methods such as sign language or AAC devices.",
  "Oral-Motor Skills":
    "Techniques used in occupational and speech therapy to strengthen muscles used for eating, speaking, and making facial expressions.",
  "Occupational Therapy Assessments":
    "Common assessments used by OTs, such as the Sensory Profile and Motor-Free Visual Perception Test, to evaluate a child's needs.",
  "Phonological Disorders":
    "Speech therapy techniques to help children with phonological disorders improve their ability to produce and organize sounds correctly.",
  "Picky Eating":
    "Feeding therapy interventions for children who are selective eaters due to sensory sensitivities or motor challenges.",
  "Quiet Time":
    "How occupational therapists use structured quiet time and calming strategies to help children with sensory processing issues self-regulate.",
  "Receptive Language Disorder":
    "Speech therapy methods to help children understand and process spoken language more effectively.",
  "Reflex Integration":
    "How occupational therapists address primitive reflexes that have not been integrated, which may affect a child's development.",
  "Sensory Processing Disorder (SPD)":
    "How occupational therapy helps children with SPD regulate their responses to sensory input, improving behavior and focus.",
  "Social Skills Training":
    "How speech and occupational therapists teach children social skills, including turn-taking, eye contact, and appropriate verbal/nonverbal communication.",
  Stuttering: "Speech therapy techniques to help children who stutter develop fluent speech patterns.",
  "Tactile Defensiveness":
    "How occupational therapy helps children who are sensitive to touch (e.g., certain textures, clothing) through desensitization and sensory integration techniques.",
  "Tongue Tie (Ankyloglossia)":
    "How speech therapy helps children with tongue tie improve feeding, speech, and oral motor control.",
  "Unilateral Neglect":
    "Therapy techniques for children who have difficulty recognizing or using one side of their body, often due to neurological conditions.",
  "Visual Perception":
    "How occupational therapy supports children in improving their ability to interpret and respond to visual information, which is essential for tasks like reading and writing.",
  "Voice Disorders":
    "Speech therapy interventions to help children with voice disorders improve vocal quality and control.",
  "W-Sitting":
    "How occupational therapists address this sitting posture, which can lead to hip, knee, and muscle issues, and work to promote better postural habits.",
  "Word Retrieval Issues":
    "Speech therapy techniques to help children who struggle to find and use the right words during communication.",
  "Xerostomia (Dry Mouth)":
    "Speech therapy solutions for managing dry mouth in children, often a side effect of medication or certain conditions, affecting speech and swallowing.",
  "Yawning as a Reflex":
    "Exploring how yawning can be a sign of fatigue or sensory overload in children and how occupational therapy helps regulate sensory responses.",
  "Z-vibe Tools":
    "How therapists use Z-vibe tools to provide oral motor stimulation for children with speech and feeding challenges.",
}


const BlogCard: React.FC<{ disease: Disease }> = ({ disease }) => {
  const getImageSource = (src: string | StaticImageData) => {
    if (typeof src === "string") {
      try {
        const url = new URL(src)
        if (url.hostname === "res.cloudinary.com") {
          return src.replace("/upload/", "/upload/f_auto,q_auto,w_800/")
        }
        return src
      } catch {
        return src
      }
    }
    return src
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-[#456696] w-full max-w-[780px] lg:max-w-none h-full flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#1E437A] font-semibold text-lg sm:text-xl lg:text-2xl">{disease.name}</h3>
        <p className="text-[#456696] text-sm sm:text-base lg:text-md mt-2 flex-grow">{disease.description}</p>
        <p className="text-[#456696] text-sm mt-2">
          <strong>Category:</strong> {disease.category}
        </p>
        {disease.symptoms && disease.symptoms.length > 0 && (
          <p className="text-[#456696] text-sm mt-1">
            <strong>Symptoms:</strong> {disease.symptoms.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}

const Health = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const diseases: Disease[] = Object.entries(healthLibrary).map(([name, description], index) => ({
    _id: `health-${index}`,
    name,
    description,
    symptoms: [],
    causes: "",
    diagnosis: "",
    treatments: "",
    category: "Pediatric Therapy",
    ageGroup: ["Children"],
    slug: name.toLowerCase().replace(/\s+/g, "-"),
  }))

  const filteredDiseases = selectedLetter
    ? diseases.filter((disease) => disease.name.toUpperCase().startsWith(selectedLetter))
    : diseases

  const getDiseasesCountByLetter = (letter: string) => {
    return diseases.filter((disease) => disease.name.toUpperCase().startsWith(letter)).length
  }

  return (
    <>
      <Navbar />
      <Banner
        title="Understanding Pediatric Diseases"
        description="A trusted resource for parents to learn about common childhood illnesses, symptoms, and treatment options."
        imageSrc={HealthBanner}
      />

      {/* A-Z Alphabet Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 mb-10">
        <div className="bg-[#F5F8FC] rounded-xl border border-[#456696] p-4">
          <h3 className="text-[#1E437A] font-semibold text-lg mb-3">Filter by letter:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium ${
                selectedLetter === null ? "bg-[#C83C92] text-white" : "bg-white text-[#456696] border border-[#456696]"
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const count = getDiseasesCountByLetter(letter)
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium ${
                    selectedLetter === letter
                      ? "bg-[#C83C92] text-white"
                      : count > 0
                        ? "bg-white text-[#456696] border border-[#456696]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={count === 0}
                >
                  {letter}
                </button>
              )
            })}
          </div>
          {selectedLetter && (
            <p className="text-[#456696] mt-3 text-center">
              Showing diseases starting with "{selectedLetter}"
              <button onClick={() => setSelectedLetter(null)} className="ml-2 text-[#C83C92] underline">
                Clear filter
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 -mb-20 sm:-mb-[160px] h-auto">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((disease) => <BlogCard key={disease._id} disease={disease} />)
        ) : (
          <div className="col-span-3 text-center text-[#456696] py-8">
            No diseases found{selectedLetter ? ` starting with "${selectedLetter}"` : ""}.
            {selectedLetter && (
              <button onClick={() => setSelectedLetter(null)} className="ml-2 text-[#C83C92] font-medium">
                View all diseases
              </button>
            )}
          </div>
        )}
      </div>

      <Consultation />
      <Footer />
    </>
  )
}

export default Health
