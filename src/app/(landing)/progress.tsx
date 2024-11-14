"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { sidair } from "@/lib/sidair";
import { artTimes } from "@/lib/artTimes";
import { braciate } from "@/lib/braciate";
import { poros } from "@/lib/poros";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | StaticImageData | null;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc }) => {
  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageSrc}
              alt="Enlarged view"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function Progress() {
  const [modalImage, setModalImage] = useState<string | StaticImageData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidairData = sidair;
  const artTimesData = artTimes;
  const braciateData = braciate;
  const porosData = poros;

  const openModal = (imageSrc: string | StaticImageData) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      title: "2024",
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="font-serif font-semibold text-3xl">Sidair</h2>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 text-justify">
              The Sidair website is an innovative platform designed to assess
              and monitor the quality of water in rice fields, helping farmers
              make informed decisions for crop management. This website offers
              an easy-to-use interface where users can input specific data
              points related to water samples. Sidair then processes this data
              and provides insights into water quality based on key indicators,
              such as pH levels, mineral content, and pollutant concentrations.
              By delivering precise and actionable information, Sidair empowers
              farmers to maintain optimal water quality, improve yield, and
              promote sustainable agricultural practices.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {sidairData.map((data, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => openModal(data.asset)}
                >
                  <Image
                    src={data.asset}
                    alt={data.thumbnail}
                    width={500}
                    height={500}
                    className="rounded-lg object-contain h-max w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:brightness-50 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif font-semibold text-3xl">Braciate</h2>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 text-justify">
              Braciate is a platform specifically for Brawijaya students,
              allowing them to vote and upload work files. With a fast and
              secure file upload feature, users can easily submit nomination
              files, supporting transparency and order in the voting process.
              Login through a UB account ensures security and exclusivity for
              students and staff of organizations within UB. Braciate simplifies
              the election and voting process, creating an efficient and
              organized experience for all nomination activities on campus.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {braciateData.map((data, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => openModal(data.asset)}
                >
                  <Image
                    src={data.asset}
                    alt={data.thumbnail}
                    width={500}
                    height={500}
                    className="rounded-lg object-contain h-max w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:brightness-50 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif font-semibold text-3xl">POROS</h2>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 text-justify">
              POROS is an autonomous organization in the Faculty of Computer
              Science, Universitas Brawijaya that focuses on research and
              practical training. POROS has three main divisions: Cyber
              Security, which handles network and data security; Front End
              Development, which focuses on interface design and user
              experience; and Back End Development, which supports systems and
              servers through database management and API creation. Through
              synergy between divisions, POROS creates innovative digital
              solutions and plays an active role in developing students skills
              in technology.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {porosData.map((data, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => openModal(data.asset)}
                >
                  <Image
                    src={data.asset}
                    alt={data.thumbnail}
                    width={500}
                    height={500}
                    className="rounded-lg object-contain h-max w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:brightness-50 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <>
          <div>
            <h2 className="font-serif font-semibold text-3xl">
              Majalah Art Times
            </h2>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 text-justify">
              Art Times is an online magazine offering insightful and inspiring
              perspectives on visual arts, photography, design, and culture. As
              a space for artists and art enthusiasts, we showcase trends,
              works, and creative insights to celebrate and connect the global
              art community.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {artTimesData.map((data, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => openModal(data.asset)}
                >
                  <Image
                    src={data.asset}
                    alt={data.thumbnail}
                    width={500}
                    height={500}
                    className="rounded-lg object-contain h-max w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:brightness-50 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
      <Modal isOpen={isModalOpen} onClose={closeModal} imageSrc={modalImage} />
    </div>
  );
}
