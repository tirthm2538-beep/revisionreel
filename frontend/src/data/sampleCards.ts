import { StoryCardData } from '../types/card';

export const SAMPLE_CARDS: StoryCardData[] = [
  // ==========================================
  // PHYSICS (Class 11-12 Board & JEE)
  // ==========================================
  {
    id: 'phys-01-newton-third-law',
    conceptNumber: 1,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: "Newton's 3rd Law & Action-Reaction Pairs",
    tag: 'Mechanics',
    readTime: '60 sec read',
    hook: "If every action has an equal and opposite reaction, why doesn't a horse pulling a cart just stay stuck in place forever?",
    explanation:
      'Action and reaction forces act on TWO DIFFERENT objects, never on the same one! The horse pulls the cart forward; the cart pulls the horse backward. The reason the horse accelerates forward is that the horse pushes backward against the ground with its hooves, and the ground pushes the horse forward with an external normal/frictional force. To find whether any object moves, you only add up the forces acting ON that single body, not the forces it exerts on the outside world.',
    analogy:
      "Think of texting on your phone. If you send 'Hi' (action) and your friend replies 'Hi' (reaction), your sent folder has one message and your friend's has another. Your phone doesn't delete your outgoing text just because a reply arrived!",
    analogyIcon: 'MessageSquare',
    quiz: {
      question: 'Why do action and reaction forces NEVER cancel each other out to zero?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Because the reaction force takes a few milliseconds to develop.',
          isCorrect: false,
          explanation: 'Action and reaction forces occur simultaneously without any time lag.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Because they act on two completely different bodies, not on the same object.',
          isCorrect: true,
          explanation: 'Forces can only cancel out if they act on the same body in the same free-body diagram!',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Because reaction forces are inherently weaker than action forces.',
          isCorrect: false,
          explanation: "Newton's third law guarantees their magnitudes are strictly equal.",
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Action-reaction pairs always act on different bodies, so they never cancel each other out!',
    },
  },
  {
    id: 'phys-02-centripetal-vs-centrifugal',
    conceptNumber: 2,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: 'Centripetal vs Centrifugal Force',
    tag: 'Circular Motion',
    readTime: '60 sec read',
    hook: 'When your car takes a sharp left turn and you get slammed into the right door, what invisible hand actually pushed you outward?',
    explanation:
      "Nothing pushed you outward! That 'outward push' is centrifugal force, which is purely an apparent or pseudo-force that only exists inside the accelerating, rotating reference frame of the car. From an observer standing on the road, your body was simply obeying Newton's 1st Law—trying to continue drifting in a straight line—until the car door turned inward into you to deliver the real inward centripetal force needed to turn!",
    analogy:
      "Imagine sliding across a slick ice rink in socks. If your friend suddenly swerves left next to you, you don't fly right; you just keep gliding straight ahead while the world turns around you.",
    analogyIcon: 'Compass',
    quiz: {
      question:
        'An astronaut inside a spinning space station feels pressed against the outer floor. What is the real physical inward force acting on them?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'The normal contact force from the floor pushing inward on their feet.',
          isCorrect: true,
          explanation:
            'The floor provides the real inward normal force that continuously deflects the astronaut into a circle.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'A centrifugal gravity wave radiating from the central axis.',
          isCorrect: false,
          explanation:
            'Centrifugal force is a pseudo-force perceived in rotating frames, not a physical radiated force.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Atmospheric pressure pushing down from the ceiling.',
          isCorrect: false,
          explanation: 'Air pressure is equal in all directions and does not provide centripetal acceleration.',
        },
      ],
      correctOptionId: 'opt-1',
      takeaway:
        "Centrifugal force is just your own inertia resisting a turn; the only real force is the inward centripetal push!",
    },
  },
  {
    id: 'phys-03-work-done-by-friction',
    conceptNumber: 3,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: 'Work Done by Friction: Positive or Negative?',
    tag: 'Work & Energy',
    readTime: '60 sec read',
    hook: 'Your textbook says friction always opposes motion, so can friction ever do positive work and speed something up?',
    explanation:
      'Yes, absolutely! Friction does not oppose motion; it opposes RELATIVE motion (slipping) between two contacting surfaces. When you walk, static friction pushes your shoe soles forward. If a cardboard box sits in the flatbed of an accelerating truck without sliding, the static friction from the truck bed is the ONLY horizontal force propelling the box forward, doing positive work on the box!',
    analogy:
      'Think of a supermarket checkout conveyor belt. Static friction between the rubber belt and your cereal box is what carries the box forward to the cashier. If friction only opposed motion, your cereal would slide off backwards!',
    analogyIcon: 'Zap',
    quiz: {
      question:
        'A parcel sits stationary on the flatbed of a truck as the truck speeds up along a highway. What work does static friction do on the parcel?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Negative work, because friction always dissipates energy as heat.',
          isCorrect: false,
          explanation:
            'Kinetic friction dissipates heat, but static friction can accelerate bodies in their direction of motion.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Positive work, because friction acts in the forward direction of displacement.',
          isCorrect: true,
          explanation:
            'Force and displacement point in the exact same direction, yielding positive work (W = F * d > 0).',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Exactly zero work, because the parcel has no velocity relative to the truck.',
          isCorrect: false,
          explanation: 'Work is evaluated with respect to the ground frame, where the parcel is displaced forward.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        'Friction opposes relative slip, not absolute motion—it can and does do positive work to speed objects up!',
    },
  },
  {
    id: 'phys-04-lenzs-law-energy',
    conceptNumber: 4,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: "Lenz's Law & Conservation of Energy",
    tag: 'Electromagnetism',
    readTime: '60 sec read',
    hook: "Why does dropping a neodymium magnet down a hollow copper pipe feel like dropping it through thick honey, even though copper isn't magnetic?",
    explanation:
      "As the magnet plunges, changing magnetic flux induces swirling circular electrical currents (eddy currents) in the copper wall. Lenz's Law states that an induced current always flows in the direction that creates an opposing magnetic field. The upward magnetic repulsion brakes the falling magnet. If it assisted the magnet instead, the magnet would accelerate infinitely fast with zero energy input, violating the Law of Conservation of Energy!",
    analogy:
      'Lenz’s Law is like an ultra-stubborn room door. If you try to push it open, a spring pushes back against you; if you try to pull it shut, the spring pulls the other way. Whatever change you try to cause, nature pushes back.',
    analogyIcon: 'Magnet',
    quiz: {
      question: "What fundamental conservation principle directly underpins Lenz's Law?",
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Conservation of Electric Charge.',
          isCorrect: false,
          explanation: "Charge conservation governs Kirchhoff's junction law, not electromagnetic induction opposition.",
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Conservation of Energy.',
          isCorrect: true,
          explanation:
            'Mechanical work done pushing against the opposing magnetic force is what generates the electrical energy.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Conservation of Angular Momentum.',
          isCorrect: false,
          explanation: 'Angular momentum applies to rotating bodies, not the flux-opposition principle.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        "Lenz's Law ensures there is no free lunch in physics: electrical energy generated equals mechanical work done!",
    },
  },
  {
    id: 'phys-05-shm-acceleration-velocity',
    conceptNumber: 5,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: 'Simple Harmonic Motion: Max Speed vs Max Pull',
    tag: 'Oscillations',
    readTime: '60 sec read',
    hook: 'When a swing pauses for a split second at the highest point of its arc, is its acceleration zero?',
    explanation:
      'Counter-intuitively, at the extreme turnaround point where velocity is zero, acceleration is at its absolute MAXIMUM! In Simple Harmonic Motion (SHM), the restoring force and acceleration are directly proportional to displacement (a = -ω²x). At maximum displacement, the spring or gravity pulls hardest toward center. Conversely, when the swing flies fastest through the center equilibrium point (x = 0), acceleration drops to zero!',
    analogy:
      'Stretching an elastic gym resistance band. At maximum stretch your hands freeze for a second (velocity = 0), but that is the exact split second the band pulls against your muscles with the greatest brutal force!',
    analogyIcon: 'Activity',
    quiz: {
      question:
        'At the equilibrium position (center) of a vibrating spring-mass system, which condition holds true?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Velocity is maximum and acceleration is zero.',
          isCorrect: true,
          explanation:
            'At x = 0, restoring force is zero so a = 0, while kinetic energy and velocity reach peak magnitude.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Both velocity and acceleration are at their maximum values.',
          isCorrect: false,
          explanation: 'Velocity and acceleration are 90 degrees out of phase; they never peak together.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Velocity is zero and acceleration is maximum.',
          isCorrect: false,
          explanation: 'This condition occurs at the extreme turnaround amplitudes, not at equilibrium.',
        },
      ],
      correctOptionId: 'opt-1',
      takeaway:
        'In SHM, acceleration peaks at the turnaround extremes; speed peaks at the zero-force center!',
    },
  },
  {
    id: 'phys-06-doppler-effect-redshift',
    conceptNumber: 6,
    subject: 'physics',
    track: 'physics',
    trackTitle: 'Class 11-12 Physics',
    conceptTitle: 'The Doppler Effect & Cosmological Redshift',
    tag: 'Waves & Optics',
    readTime: '60 sec read',
    hook: 'Why does a racing car engine drop from a high whine to a deep roar as it zooms past, and how did that tell us the universe is expanding?',
    explanation:
      'When an emitter moves toward you, each new wave crest is emitted closer to the previous one, compressing wavelengths and raising observed frequency (higher pitch in sound, bluer light). When receding, wave crests stretch apart (lower pitch, redder light). In the 1920s, Edwin Hubble noticed spectral absorption lines from distant galaxies were systematically shifted toward the red end—proving that distant galaxies are racing away from us as space itself expands!',
    analogy:
      'Imagine a friend rolling tennis balls toward you every 2 seconds. If they jog toward you while rolling, the balls reach you every 1 second. If they jog away, the gap between balls stretches to 3 seconds!',
    analogyIcon: 'Radio',
    quiz: {
      question: 'When light from a distant galaxy exhibits a redshift, what does this tell astrophysicists?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: "The galaxy's temperature is steadily dropping.",
          isCorrect: false,
          explanation:
            'Temperature shifts affect overall blackbody curves, but Doppler redshift shifts specific spectral lines.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'The distance between the galaxy and Earth is increasing over time.',
          isCorrect: true,
          explanation: 'Recession stretches the light waves toward longer, redder wavelengths.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The light is passing through dense interstellar iron clouds.',
          isCorrect: false,
          explanation:
            'Absorption lines identify elemental composition, but systematic wavelength shift indicates relative velocity.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Compressed waves = approaching (blueshift); stretched waves = receding (redshift)!',
    },
  },

  // ==========================================
  // CHEMISTRY (Class 11-12 Board & JEE)
  // ==========================================
  {
    id: 'chem-01-electronegativity-vs-affinity',
    conceptNumber: 7,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: 'Electronegativity vs Electron Affinity',
    tag: 'Periodic Trends',
    readTime: '60 sec read',
    hook: 'Fluorine is the most electronegative element on the entire periodic table, so why does Chlorine release more energy when grabbing an electron?',
    explanation:
      "Electronegativity is an atom's pull on SHARED electrons inside a covalent bond (a dimensionless Pauling scale). Electron Affinity is the actual thermodynamic enthalpy released when an isolated gaseous atom captures a brand-new, FREE electron. Fluorine's 2p subshell is so tiny and densely packed that incoming electrons face severe electron-electron repulsion. Chlorine's roomier 3p subshell accommodates the incoming electron with less crowding, releasing more net energy!",
    analogy:
      'Electronegativity is how fiercely you tug on a shared tug-of-war rope. Electron affinity is how easily an extra guest fits into your flat. Fluorine is a tiny studio apartment where people bump elbows!',
    analogyIcon: 'Layers',
    quiz: {
      question: 'Why does Chlorine possess a higher electron affinity (more negative ΔH) than Fluorine?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Chlorine has higher nuclear charge that completely overrides shielding.',
          isCorrect: false,
          explanation:
            'Effective nuclear charge increases across a period, but here we are comparing elements in the same group.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: "Fluorine's compact 2p subshell causes heavy inter-electronic repulsion against incoming electrons.",
          isCorrect: true,
          explanation:
            'The extremely small volume of Fluorine’s 2p orbital creates repulsion that offsets the nuclear attraction.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Fluorine does not form stable negative anions in nature.',
          isCorrect: false,
          explanation:
            'Fluoride (F-) is exceptionally stable; it simply releases slightly less energy upon gaseous formation.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Electronegativity measures sharing in bonds; Electron Affinity measures adopting a free electron!',
    },
  },
  {
    id: 'chem-02-le-chatelier-inert-gas',
    conceptNumber: 8,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: "Le Chatelier's Principle & Inert Gas Addition",
    tag: 'Chemical Equilibrium',
    readTime: '60 sec read',
    hook: 'If you pump inert Argon gas into a rigid closed flask at equilibrium, total pressure jumps up—so why does the reaction refuse to shift?',
    explanation:
      "Le Chatelier's principle responds to changes in PARTIAL pressures and reactant concentrations, not arbitrary total pressure! In a rigid vessel with CONSTANT VOLUME, adding inert gas increases total pressure, but the volume (V) and moles (n_i) of the reacting gases don't change. Their partial pressures (P_i = n_i RT / V) remain strictly identical! The reaction only shifts if inert gas is added at CONSTANT TOTAL PRESSURE, which forces the vessel volume to expand.",
    analogy:
      'Adding silent spectators into a sports arena. If 1,000 spectators walk into the stands (total crowd climbs), the 22 players on the pitch have the exact same space and rules—the football match doesn’t alter!',
    analogyIcon: 'Scale',
    quiz: {
      question: 'For the Haber process N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what happens when Helium is added at CONSTANT VOLUME?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Equilibrium shifts forward to produce more ammonia and relieve total pressure.',
          isCorrect: false,
          explanation:
            'Total pressure rose from an inert gas, not from reacting species, so partial pressures remained unchanged.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Equilibrium remains completely unchanged.',
          isCorrect: true,
          explanation:
            'Because volume is constant, the concentration and partial pressure of N2, H2, and NH3 do not change.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Equilibrium shifts backward to decompose ammonia.',
          isCorrect: false,
          explanation: 'Backward shift only occurs if volume expands at constant total pressure.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        'Inert gas at constant volume changes total gauge pressure without changing reactant concentrations—no shift!',
    },
  },
  {
    id: 'chem-03-sn1-vs-sn2-mechanisms',
    conceptNumber: 9,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: 'SN1 vs SN2 Nucleophilic Substitution',
    tag: 'Organic Chemistry',
    readTime: '60 sec read',
    hook: 'Why does a tertiary haloalkane wait for its leaving group to pack up and walk away, while a primary halide gets booted in one simultaneous punch?',
    explanation:
      'Steric hindrance and carbocation stability govern the battle! In SN2 (bimolecular), a strong nucleophile attacks the electrophilic carbon from the backside in ONE concerted step with inversion of configuration (Walden inversion). Bulky methyl groups on tertiary carbons block this rear attack. In SN1 (unimolecular), the leaving group leaves first to form a planar carbocation intermediate (stabilized by hyperconjugation and +I induction), which the nucleophile then attacks from either face (racemization)!',
    analogy:
      'SN2 is like a revolving door: one person enters right behind another as they exit. SN1 is like an airport bathroom stall: the first occupant must walk out completely before someone else can enter.',
    analogyIcon: 'RefreshCw',
    quiz: {
      question: 'Which combination of substrate and solvent overwhelmingly favors an SN2 reaction mechanism?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Tertiary alkyl halide (3°) in water or ethanol.',
          isCorrect: false,
          explanation: 'Bulky 3° halides cannot undergo backside attack and prefer SN1 via carbocation.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Primary alkyl halide (1°) with a strong nucleophile in acetone or DMSO.',
          isCorrect: true,
          explanation:
            'Uncrowded 1° carbon allows easy backside access, and polar aprotic solvents keep nucleophiles naked and reactive!',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Allylic substrate in high concentration sulfuric acid.',
          isCorrect: false,
          explanation: 'Strong acidic conditions promote carbocation or elimination pathways.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        'SN2 is a one-step backside attack on unhindered 1° carbons; SN1 forms a planar carbocation on stable 3° carbons!',
    },
  },
  {
    id: 'chem-04-catalysts-activation-energy',
    conceptNumber: 10,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: "Catalysts & Activation Energy: What They Don't Change",
    tag: 'Chemical Kinetics',
    readTime: '60 sec read',
    hook: 'Does a catalyst make a sluggish reaction run faster by injecting energy into sleepy molecules?',
    explanation:
      'No! Catalysts never supply heat, thermal energy, or enthalpy. Instead, they provide an ALTERNATIVE transition-state pathway featuring a significantly lower activation energy barrier (Ea). Because the barrier is lower, a vastly greater fraction of colliding molecules possess sufficient kinetic energy to react. Crucially, a catalyst speeds up the forward and backward reactions by the exact same multiplier—it reaches equilibrium faster, but NEVER changes ΔG, ΔH, or the equilibrium constant Keq!',
    analogy:
      'Blasting a tunnel through a tall mountain. The tunnel doesn’t upgrade your car engine or move the destination cities; it just provides a lower, easier pass to cross through.',
    analogyIcon: 'Zap',
    quiz: {
      question:
        'Which of the following thermodynamic variables is altered when a positive catalyst is added to a reaction?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Standard Gibbs free energy change (ΔG°).',
          isCorrect: false,
          explanation: 'ΔG is a state function depending only on initial reactants and final products.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'The Activation Energy (Ea) of the forward and reverse steps.',
          isCorrect: true,
          explanation: 'Catalysts lower the kinetic barrier (Ea) by providing a new reaction mechanism.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The Equilibrium Constant (Keq).',
          isCorrect: false,
          explanation:
            'Keq depends solely on the thermodynamic free energy difference and temperature, which remain unchanged.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Catalysts lower the kinetic barrier (Ea) without altering thermodynamic endpoints (ΔG, ΔH, Keq)!',
    },
  },
  {
    id: 'chem-05-raoults-law-colligative',
    conceptNumber: 11,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: "Raoult's Law & Colligative Properties",
    tag: 'Solutions',
    readTime: '60 sec read',
    hook: 'Why do chefs add salt to water before boiling, and why does sprinkling salt melt icy sidewalks in the dead of winter?',
    explanation:
      'When a non-volatile solute (like NaCl or sugar) dissolves in water, solute particles occupy surface spots previously held by volatile solvent molecules. Fewer water molecules can escape into vapor phase, depressing vapor pressure (Raoult’s Law). Because boiling requires vapor pressure to match atmospheric pressure, you must heat salted water higher to boil (Boiling Point Elevation). For freezing, solute particles disrupt the rigid ice crystal matrix, dragging the freezing point down!',
    analogy:
      'Imagine an exit door at a stadium. If people stand stationary blocking half the doorway, fewer people can run out per second. You have to push with much more frantic energy to maintain the escape rate.',
    analogyIcon: 'Flame',
    quiz: {
      question: 'Colligative properties (like freezing point depression) depend strictly on which factor?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'The specific chemical identity, structure, and bonding of the solute.',
          isCorrect: false,
          explanation: 'Colligative properties are independent of chemical nature or size of solute molecules.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'The total number of dissolved solute particles relative to solvent molecules.',
          isCorrect: true,
          explanation:
            'By definition, colligative properties depend only on the count (number of particles/ions) in solution.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The magnetic dipole moment of the solute crystal.',
          isCorrect: false,
          explanation: 'Magnetic dipole moments have no role in colligative vapor pressure lowering.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Colligative effects care about the headcount of dissolved particles, never their chemical pedigree!',
    },
  },
  {
    id: 'chem-06-buffer-solutions-equilibrium',
    conceptNumber: 12,
    subject: 'chemistry',
    track: 'chemistry',
    trackTitle: 'Class 11-12 Chemistry',
    conceptTitle: 'Buffer Solutions & The Common Ion Effect',
    tag: 'Ionic Equilibrium',
    readTime: '60 sec read',
    hook: 'Your blood pH must stay strictly between 7.35 and 7.45. How does it survive when you chug a glass of acidic lemon juice or soda?',
    explanation:
      'Human blood is equipped with a carbonic acid/bicarbonate buffer (H₂CO₃ / HCO₃⁻). A buffer solution contains a weak acid and its conjugate salt in roughly equal concentrations. When unexpected acid (H⁺) invades, the conjugate base absorbs it. When extra alkaline base (OH⁻) enters, the weak acid neutralizes it. According to the Henderson-Hasselbalch equation (pH = pKa + log [A⁻]/[HA]), the ratio [A⁻]/[HA] barely flinches, shielding pH from drastic swings!',
    analogy:
      'Shock absorbers on a mountain bike. When you hit a rocky bump (acid shock) or a pothole (base shock), the hydraulic coil compresses and rebounds, keeping the rider completely steady.',
    analogyIcon: 'Shield',
    quiz: {
      question: 'Which of the following mixtures forms an effective acidic buffer solution?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Strong hydrochloric acid (HCl) mixed with sodium chloride (NaCl).',
          isCorrect: false,
          explanation:
            'Strong acids dissociate completely and have non-basic conjugate ions (Cl-), offering zero buffering capacity.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Weak acetic acid (CH₃COOH) paired with sodium acetate (CH₃COONa).',
          isCorrect: true,
          explanation: 'A classic buffer pairing a weak acid with its common conjugate base reservoir.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Strong sodium hydroxide (NaOH) paired with potassium hydroxide (KOH).',
          isCorrect: false,
          explanation: 'A mixture of two strong bases produces a caustic alkaline solution with no buffering mechanism.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Buffers balance a weak acid with its conjugate base to absorb stray H⁺ or OH⁻ shocks!',
    },
  },

  // ==========================================
  // MATHEMATICS (Class 11-12 Board & JEE)
  // ==========================================
  {
    id: 'math-01-derivatives-instantaneous-rate',
    conceptNumber: 13,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: 'Derivatives: The Illusion of 0/0',
    tag: 'Calculus',
    readTime: '60 sec read',
    hook: 'If your car speedometer reads 80 km/h at the exact instant you pass a speed camera, how can speed exist in a time interval of zero seconds?',
    explanation:
      'Speed equals distance divided by time. At a single frozen snapshot of time, distance traveled is 0 and time elapsed is 0, giving the forbidden indeterminate 0/0! Calculus solves this through limits: lim(h→0) [f(x+h) - f(x)] / h. We never plug in h = 0; instead, we analyze the exact value that average speeds approach as the observation window h shrinks infinitely close to zero. Geometrically, this limit yields the tangent line’s slope!',
    analogy:
      'Zooming into a highway curve on Google Maps. If you zoom in tight enough on a looping hairpin turn, that tiny curved segment appears completely straight. That straight line’s tilt is the derivative!',
    analogyIcon: 'TrendingUp',
    quiz: {
      question: 'What does the limit lim(x→a) [f(x) - f(a)] / (x - a) represent geometrically on the graph y = f(x)?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'The total area trapped beneath the curve from x = 0 to x = a.',
          isCorrect: false,
          explanation: 'Trapped area is represented by definite integration, not differentiation.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'The slope of the tangent line touching the curve precisely at x = a.',
          isCorrect: true,
          explanation: 'As the secant chord narrows, its slope converges to the instantaneous tangent slope f’(a).',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The radius of curvature of the osculating circle.',
          isCorrect: false,
          explanation: 'Radius of curvature requires second derivatives, not the first derivative definition.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: "Derivatives aren't division by zero; they are the limiting convergence of secants to a tangent!",
    },
  },
  {
    id: 'math-02-definite-integrals-signed-area',
    conceptNumber: 14,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: 'Definite Integrals: Net Signed Area',
    tag: 'Calculus',
    readTime: '60 sec read',
    hook: 'If you evaluate the definite integral of sin(x) from 0 to 2π, the math gives exactly 0. Does a sine wave really enclose zero area?',
    explanation:
      'Definite integrals compute NET SIGNED AREA, not absolute geometric area! Regions above the x-axis where f(x) > 0 accumulate positive area (+), while regions below the x-axis where f(x) < 0 accumulate negative area (-). For sin(x) across [0, 2π], the positive crest from 0 to π gives +2, and the identical negative trough from π to 2π gives -2, summing to zero! To find total physical enclosed area, you must split the integral or integrate |f(x)|.',
    analogy:
      'Your monthly bank statement. If you deposit $1,000 on Monday and withdraw $1,000 on Friday, your net change is $0, even though $2,000 worth of financial transactions took place!',
    analogyIcon: 'PieChart',
    quiz: {
      question: 'What is the critical distinction between ∫[a to b] f(x) dx and ∫[a to b] |f(x)| dx?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'The first computes net signed area; the second computes total physical area.',
          isCorrect: true,
          explanation:
            'Taking the absolute value forces negative sub-axis regions to flip positive, counting all area positively.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Both integrals yield identical numerical values for every real function.',
          isCorrect: false,
          explanation: 'Whenever f(x) dips below the x-axis, the two integrals produce different results.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The absolute value integral is always equal to zero.',
          isCorrect: false,
          explanation: 'Integrating a non-negative function produces an area greater than or equal to zero.',
        },
      ],
      correctOptionId: 'opt-1',
      takeaway: 'Definite integrals compute signed net balances: crests add, troughs subtract!',
    },
  },
  {
    id: 'math-03-dot-vs-cross-product',
    conceptNumber: 15,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: 'Dot Product vs Cross Product',
    tag: 'Vectors & 3D',
    readTime: '60 sec read',
    hook: 'You multiply two vectors together. When does the result collapse into a plain number, and when does it forge a brand-new arrow pointing into 3D space?',
    explanation:
      'The Dot Product (a · b = |a||b|cos θ) measures directional alignment, returning a pure SCALAR. If vectors are perpendicular (90°), their dot product is 0 (like Work = F · d). The Cross Product (a × b = |a||b|sin θ * n̂) measures mutual perpendicularity and rotational leverage, producing a VECTOR perpendicular to both original vectors via the right-hand rule (like Torque = r × F). If vectors are parallel (0°), their cross product vanishes!',
    analogy:
      'Dot product is like walking side-by-side with a friend (parallel collaboration = max dot product). Cross product is like opening a door with a wrench (twisting at 90 degrees delivers maximum turning leverage).',
    analogyIcon: 'Maximize2',
    quiz: {
      question: 'If two non-zero vectors u and v satisfy u · v = 0, what does this confirm about their geometric relationship?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'The vectors are parallel and point in the same direction.',
          isCorrect: false,
          explanation: 'Parallel vectors have cos(0) = 1, maximizing dot product.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'The vectors are strictly orthogonal (perpendicular at 90 degrees).',
          isCorrect: true,
          explanation: 'Because cos(90°) = 0, perpendicular vectors always produce a dot product of zero.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'The vectors lie in antiparallel directions along the same line.',
          isCorrect: false,
          explanation: 'Antiparallel vectors have cos(180°) = -1, yielding a negative dot product.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        'Dot product measures directional teamwork (scalar); Cross product measures twisting torque (perpendicular vector)!',
    },
  },
  {
    id: 'math-04-bayes-theorem-base-rate',
    conceptNumber: 16,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: "Bayes' Theorem & The Base Rate Fallacy",
    tag: 'Probability',
    readTime: '60 sec read',
    hook: 'A rare virus infects 1 in 1,000 people. A lab test is 99% accurate. If you test positive, is there a 99% chance you are sick?',
    explanation:
      'Shockingly, no! Your real chance of being infected is only about 9%! Bayes’ Theorem (P(D|+) = P(+|D)*P(D) / P(+)) reveals why: in a city of 100,000 people, only 100 have the virus (99 test positive). But 99,900 people are healthy, and the 1% false-positive rate falsely flags roughly 999 healthy people as positive! Out of ~1,098 total positive test results, only 99 actually have the bug (99 / 1098 ≈ 9%).',
    analogy:
      'A security metal detector in a school library with 99% accuracy. Because almost nobody carries a weapon into a library, 99% of its beeps are false alarms from innocent belt buckles and laptop chargers!',
    analogyIcon: 'HelpCircle',
    quiz: {
      question:
        'Why does a 99% accurate medical test produce mostly false positive results when screening a rare condition?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Because the testing reagents degrade rapidly at room temperature.',
          isCorrect: false,
          explanation: 'The issue is mathematical probability, not chemical degradation.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Because the overwhelming healthy majority creates far more 1% false alarms than the tiny infected pool.',
          isCorrect: true,
          explanation:
            '1% of 99,900 healthy people (~999 false positives) far outnumbers 99% of 100 sick people (99 true positives).',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: "Because Bayes' theorem assumes events are mutually exclusive.",
          isCorrect: false,
          explanation: "Bayes' theorem accounts for overlapping conditional probability.",
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'Always factor in the base rate: when a disease is rare, false alarms easily outnumber real cases!',
    },
  },
  {
    id: 'math-05-continuity-vs-differentiability',
    conceptNumber: 17,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: 'Continuity vs Differentiability: The Sharp Corner',
    tag: 'Calculus',
    readTime: '60 sec read',
    hook: 'Can you draw a continuous curve without ever lifting your pen from the paper, yet find a point where calculating its slope is completely impossible?',
    explanation:
      'Yes! A function can be continuous everywhere but fail to be differentiable at sharp corners or cusps. Consider f(x) = |x| at x = 0. The graph has no gaps or breaks (it is continuous). But approaching from the left, slope is -1; approaching from the right, slope is +1. Because the two one-sided slopes clash abruptly at the vertex, no unique tangent line exists! Thus: Differentiability strictly implies Continuity, but Continuity DOES NOT imply Differentiability.',
    analogy:
      'Driving an F1 car down a track. A continuous curved bend allows you to steer smoothly with a well-defined turning rate. But hitting a sharp 90-degree jagged knife-edge corner would snap your steering rack because there is no single tangent path!',
    analogyIcon: 'CheckCircle2',
    quiz: {
      question:
        'Which statement correctly describes the logical connection between continuity and differentiability of f(x) at x = c?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'If f(x) is continuous at c, it is always guaranteed to be differentiable at c.',
          isCorrect: false,
          explanation: 'Counterexample: f(x) = |x| at x = 0 is continuous but not differentiable.',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'If f(x) is differentiable at c, it is guaranteed to be continuous at c.',
          isCorrect: true,
          explanation:
            'Differentiability is a stricter smoothness condition: lim(x→c) [f(x)-f(c)] = f’(c)*0 = 0, proving continuity.',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'A function with a sharp corner is always differentiable if its limit exists.',
          isCorrect: false,
          explanation: 'Sharp corners have unequal left and right derivatives, so no derivative exists.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway:
        'Differentiability is smoothness: differentiable implies continuous, but not every continuous curve is smooth!',
    },
  },
  {
    id: 'math-06-permutations-vs-combinations',
    conceptNumber: 18,
    subject: 'mathematics',
    track: 'mathematics',
    trackTitle: 'Class 11-12 Mathematics',
    conceptTitle: 'Permutations vs Combinations: Does Order Matter?',
    tag: 'Algebra & Combinatorics',
    readTime: '60 sec read',
    hook: "Why should the three-digit 'combination lock' on your gym locker technically be called a 'permutation lock'?",
    explanation:
      'In mathematics, order makes all the difference! A Permutation counts arrangements where ORDER MATTERS (P(n, r) = n! / (n-r)!). If your locker code is 3-1-2, entering 1-2-3 fails miserably. A Combination counts selections where ORDER DOES NOT MATTER (C(n, r) = n! / [r!(n-r)!]). A pizza topped with mushrooms and olives is the exact same pizza if you toss olives on first!',
    analogy:
      'A permutation is choosing Gold, Silver, and Bronze medal winners at the Olympic finals. A combination is picking 3 friends to join you for an afternoon movie.',
    analogyIcon: 'Shuffle',
    quiz: {
      question:
        'When selecting a 4-person student council committee from 10 eligible candidates with equal rank, which method applies?',
      options: [
        {
          id: 'opt-1',
          label: 'A',
          text: 'Permutation (¹⁰P₄), because students are chosen one after another.',
          isCorrect: false,
          explanation:
            'Order of calling names doesn’t alter the council roster, so permutation overcounts by 4! (24x).',
        },
        {
          id: 'opt-2',
          label: 'B',
          text: 'Combination (¹⁰C₄), because the committee membership is unaffected by selection sequence.',
          isCorrect: true,
          explanation:
            'Since all 4 committee seats share equal rank, order does not matter (10! / (4! * 6!) = 210 ways).',
        },
        {
          id: 'opt-3',
          label: 'C',
          text: 'Factorial multiplication (10! * 4!).',
          isCorrect: false,
          explanation: 'This formula drastically overcounts possible selections.',
        },
      ],
      correctOptionId: 'opt-2',
      takeaway: 'If sequence changes the outcome, use Permutations; if order is irrelevant, use Combinations!',
    },
  },
];
