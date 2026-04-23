import React from 'react'
import { motion } from "framer-motion";
import { Brain, Database, Bot, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Chat Assistant",
    desc: "Ask questions and get instant answers from company documents"
  },
  {
    icon: Database,
    title: "Vector Knowledge Search",
    desc: "Semantic search using embeddings"
  },
  {
    icon: Bot,
    title: "Automation Engine",
    desc: "Automate workflows and data extraction"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Secure document storage and authentication"
  }
];

const Home2 = () => {

  return (
    <section className="py-24 bg-slate-900 text-white">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Powerful AI Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index)=>{

            const Icon = feature.icon;

            return(
              <motion.div
                key={index}
                whileHover={{ scale:1.05 }}
                className="bg-slate-800 p-6 rounded-xl"
              >
                <Icon className="w-8 h-8 text-indigo-400"/>

                <h3 className="mt-4 font-semibold text-lg">
                  {feature.title}
                </h3>

                <p className="text-slate-400 mt-2 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}

        </div>
      </div>

    </section>
  )
}

export default Home2