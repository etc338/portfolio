const fs = require('fs');
const path = require('path');

const pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');

function extractComponent(regex) {
  const match = pageContent.match(regex);
  return match ? match[1] : null;
}

const portfolioDataMatch = pageContent.match(/const portfolioData = (\{[\s\S]*?\n\};\n)/);
const portfolioData = portfolioDataMatch ? portfolioDataMatch[1] : '';

const githubMatch = pageContent.match(/const Github = ([\s\S]*?\);\n)/);
const github = githubMatch ? githubMatch[1] : '';

const linkedinMatch = pageContent.match(/const Linkedin = ([\s\S]*?\);\n)/);
const linkedin = linkedinMatch ? linkedinMatch[1] : '';

const customCursorMatch = pageContent.match(/const CustomCursor = \(\) => (\{[\s\S]*?\}\n\};\n)/);
const customCursor = customCursorMatch ? customCursorMatch[1] : '';

const background3DMatch = pageContent.match(/const Background3D = \(\) => (\{[\s\S]*?\}\n\};\n)/);
const background3D = background3DMatch ? background3DMatch[1] : '';

const interactiveTorusMatch = pageContent.match(/const InteractiveTorus = \(\) => (\{[\s\S]*?\}\n\};\n)/);
const interactiveTorus = interactiveTorusMatch ? interactiveTorusMatch[1] : '';

const navbarMatch = pageContent.match(/const Navbar = \(\) => (\{[\s\S]*?\}\n\};\n)/);
const navbar = navbarMatch ? navbarMatch[1] : '';

const animatedCounterMatch = pageContent.match(/const AnimatedCounter = ([\s\S]*?\}\n\};\n)/);
const animatedCounter = animatedCounterMatch ? animatedCounterMatch[1] : '';

const globalStylesMatch = pageContent.match(/__html: `([\s\S]*?)`\}\} \/>/);
const globalStyles = globalStylesMatch ? globalStylesMatch[1] : '';

// 1. Write globals.css
const globalsCss = `@import "tailwindcss";

${globalStyles}
`;
fs.writeFileSync('src/app/globals.css', globalsCss);

// 2. Write src/data/portfolio.ts
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/portfolio.ts', `export const portfolioData = ${portfolioData}`);

// 3. Write src/components/icons/SocialIcons.tsx
fs.mkdirSync('src/components/icons', { recursive: true });
fs.writeFileSync('src/components/icons/SocialIcons.tsx', `import React from 'react';

export const Github = ${github}
export const Linkedin = ${linkedin}`);

// 4. Write src/components/ui/CustomCursor.tsx
fs.mkdirSync('src/components/ui', { recursive: true });
fs.writeFileSync('src/components/ui/CustomCursor.tsx', `"use client";
import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => ${customCursor}`);

// 5. Write src/components/3d/Background3D.tsx
fs.mkdirSync('src/components/3d', { recursive: true });
fs.writeFileSync('src/components/3d/Background3D.tsx', `"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D = () => ${background3D}`);

// 6. Write src/components/3d/InteractiveTorus.tsx
fs.writeFileSync('src/components/3d/InteractiveTorus.tsx', `"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const InteractiveTorus = () => ${interactiveTorus}`);

// 7. Write src/components/layout/Navbar.tsx
fs.mkdirSync('src/components/layout', { recursive: true });
fs.writeFileSync('src/components/layout/Navbar.tsx', `"use client";
import React, { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Navbar = () => ${navbar}`);

// 8. Write src/components/ui/AnimatedCounter.tsx
fs.writeFileSync('src/components/ui/AnimatedCounter.tsx', `"use client";
import React, { useEffect, useRef, useState } from 'react';

export const AnimatedCounter = ${animatedCounter}`);

// Now replace page.tsx
const newPage = `"use client";
import React, { useEffect, useRef } from 'react';
import { 
  Mail, ExternalLink, ChevronDown, Send, Briefcase, Code, GraduationCap,
  Trophy, Award
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Github, Linkedin } from '@/components/icons/SocialIcons';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Background3D } from '@/components/3d/Background3D';
import { InteractiveTorus } from '@/components/3d/InteractiveTorus';
import { Navbar } from '@/components/layout/Navbar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function App() {
${pageContent.match(/export default function App\(\) \{([\s\S]*)\n\}/)[1].replace(/<GlobalStyles \/>\s*/g, '')}
}
`;

fs.writeFileSync('src/app/page.tsx', newPage);

console.log('Restructuring complete!');
