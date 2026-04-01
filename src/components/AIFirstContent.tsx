import { useEffect, useState } from "react";
import { ExternalLink, TrendingUp, Users, Target, BookOpen, Download } from "lucide-react";

// Componente estandarizado para casos de éxito/fracaso
interface CaseStudyItem {
  title: string;
  description: string;
  type: 'success' | 'failure';
}

interface CaseStudyGridProps {
  successCases: CaseStudyItem[];
  failureCases: CaseStudyItem[];
}

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ successCases, failureCases }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      <div className="space-y-6">
        <h4 className="font-semibold text-green-800 text-lg">✅ Casos de Éxito Paradigmáticos</h4>
        
        <div className="space-y-4">
          {successCases.map((case_, index) => (
            <div key={index} className="border-l-4 border-green-400 pl-4">
              <h5 className="font-semibold text-green-800">{case_.title}</h5>
              <p className="text-gray-600 leading-relaxed">
                {case_.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="font-semibold text-red-800 text-lg">❌ Fracasos Instructivos</h4>
        
        <div className="space-y-4">
          {failureCases.map((case_, index) => (
            <div key={index} className="border-l-4 border-red-400 pl-4">
              <h5 className="font-semibold text-red-800">{case_.title}</h5>
              <p className="text-gray-600 leading-relaxed">
                {case_.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const contentData = [{
  phase: "Qué es AI-First",
  phaseNumber: "01",
  chapters: [{
    number: "1",
    title: "Introducción: El Imperativo AI-First",
    content: <div className="space-y-6">
        {/* Video Component */}
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-8">
          <video 
            className="w-full h-full object-cover"
            poster="/articulo1-card.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/video1.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>

        <p className="text-gray-600 leading-relaxed">
          En el panorama empresarial de 2025, la inteligencia artificial (IA) no es solo una tendencia tecnológica; representa un cambio fundamental en cómo las organizaciones crean valor, toman decisiones y compiten en el mercado global. El concepto de "AI-first" va mucho más allá de la simple adopción de herramientas de IA: implica una reimaginación completa de la estructura organizacional, los procesos de negocio y la cultura empresarial.
        </p>
        
        <p className="text-gray-600 leading-relaxed">
          Según el exhaustivo informe de Box Inc., convertirse en una empresa AI-first significa transformar fundamentalmente las operaciones, la cultura y la creación de valor alrededor de la IA como piedra angular estratégica. Esta transformación no es opcional para las empresas que aspiran a liderar en la próxima década; es un imperativo existencial que determina quién prosperará y quién quedará obsoleto en la economía digital.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <p className="text-blue-700 italic text-lg leading-relaxed">
            "Este playbook sirve como guía exhaustiva para líderes empresariales que buscan esta transformación, inspirado en lecciones históricas de transiciones como web-first y mobile-first, pero adaptado a las realidades únicas de la era de la inteligencia artificial."
          </p>
        </div>

        <h4 className="font-semibold text-gray-800 text-xl mt-8 mb-4">¿Por qué es crucial actuar ahora?</h4>
        
        <p className="text-gray-600 leading-relaxed">
          El año 2025 marca un punto de inflexión en la madurez de las tecnologías de IA. Los avances en modelos de lenguaje grandes (LLMs), agentes inteligentes y sistemas de procesamiento multimodal han alcanzado un nivel de sofisticación que permite aplicaciones empresariales reales y escalables. Las empresas que adoptan estrategias AI-first no solo están experimentando mejoras incrementales, sino transformaciones exponenciales en sus capacidades operativas.
        </p>

        <p className="text-gray-600 leading-relaxed">
          La evidencia empírica es contundente. Las empresas que han implementado estrategias AI-first reportan mejoras significativas en múltiples métricas clave:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-gray-600 leading-relaxed">
          <li><strong>37% de ganancias en productividad</strong> según la encuesta comprehensiva de Box "The State of AI in the Enterprise", que analizó más de 1,500 organizaciones globales</li>
          <li><strong>Reducción del 42% en el tiempo de procesamiento</strong> de tareas cognitivas complejas cuando se implementan correctamente</li>
          <li><strong>Incremento del 60% en la velocidad de innovación</strong> medida por el tiempo desde la concepción hasta la implementación de nuevos productos y servicios</li>
        </ul>

        <p className="text-gray-600 leading-relaxed">
          Sin embargo, el camino hacia la transformación AI-first está plagado de desafíos. Un alarmante 42% de los proyectos de IA fallan debido a una implementación deficiente, falta de alineación estratégica o resistencia cultural, según datos de TechFunnel 2025. Estos fracasos no son inevitables; son el resultado predecible de abordar la IA como una mejora tecnológica incremental en lugar de como el catalizador de una transformación organizacional fundamental.
        </p>

        {/* Download Links */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Recursos de Referencia
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://media-publications.bcg.com/BCG-Executive-Perspectives-AI-First-Companies-Win-the-Future-Issue1-10June2025.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              BCG Executive Perspectives
            </a>
            <a 
              href="https://cloud.app.box.com/s/58461dcylju9f7g11c7f0getfnrvlwnc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Box AI-First Report
            </a>
            <a 
              href="https://hbr.org/2025/06/the-ai-revolution-wont-happen-overnight" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Harvard Business Review
            </a>
            <a 
              href="https://www.forbes.com/lists/ai50/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Forbes AI 50
            </a>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mt-6">
          <strong>Objetivo del playbook:</strong> Este documento proporciona un roadmap detallado y práctico, enriquecido con ejemplos reales de implementación exitosa y fracasos instructivos, para guiar a los líderes empresariales a través de la compleja pero necesaria transformación hacia una organización AI-first. Cada recomendación está respaldada por evidencia empírica y mejores prácticas identificadas a través del análisis de cientos de casos de estudio empresariales.
        </p>
      </div>
  }, {
    number: "2",
    title: "Expansión de Capacidades",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          La característica más transformadora de una organización AI-first es su capacidad para trascender las limitaciones tradicionales de escala, velocidad y complejidad. La IA no simplemente automatiza procesos existentes; fundamentalmente expande lo que es posible hacer, creando nuevas categorías de capacidades que antes eran impensables o económicamente inviables.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Consideremos algunos ejemplos concretos de esta expansión de capacidades. En el ámbito del desarrollo de software, empresas AI-first pueden generar aplicaciones funcionales completas a partir de descripciones en lenguaje natural, un proceso que tradicionalmente requería semanas o meses de desarrollo puede completarse en horas. En el análisis de datos, sistemas de IA pueden procesar y extraer insights de petabytes de información no estructurada—documentos, imágenes, videos, audio—en tiempo real, una tarea que excedería las capacidades de equipos humanos incluso con recursos ilimitados.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Caso de Éxito: Nvidia
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Nvidia ha revolucionado su proceso de diseño de semiconductores utilizando IA para optimizar arquitecturas de chips a nivel nanométrico. Sus sistemas de IA pueden evaluar millones de configuraciones de diseño simultáneamente, identificando optimizaciones que escapan al análisis humano. Este enfoque AI-first les ha permitido lograr avances significativos en computación cuántica y procesamiento paralelo, estableciendo nuevos estándares de rendimiento en la industria (Fast Company, 2025).
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Nuevas Capacidades Emergentes
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Las organizaciones AI-first pueden localizar campañas de marketing para 25+ idiomas y culturas simultáneamente, resolver bugs de baja prioridad que tradicionalmente permanecían en backlog indefinidamente, y crear contenido personalizado a escala individual para millones de usuarios. Estas capacidades no existían en el paradigma empresarial tradicional.
            </p>
          </div>
        </div>

        <h5 className="font-semibold text-gray-800 text-lg mt-8 mb-4">La pregunta transformadora:</h5>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <p className="text-yellow-800 font-medium text-xl mb-3">
            "¿Qué podríamos hacer ahora que antes era completamente imposible?"
          </p>
          <p className="text-yellow-700 leading-relaxed">
            Esta pregunta fundamental debe guiar el pensamiento estratégico de toda organización que aspira a ser AI-first. No se trata de hacer las mismas cosas de manera más eficiente, sino de descubrir posibilidades enteramente nuevas que emergen cuando la inteligencia artificial amplifica las capacidades humanas de formas exponenciales.
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed mt-6">
          La expansión de capacidades también se manifiesta en la velocidad de iteración e innovación. Empresas AI-first pueden probar cientos de variaciones de productos, servicios o estrategias en paralelo, aprendiendo y optimizando a velocidades que superan por órdenes de magnitud los ciclos tradicionales de desarrollo empresarial. Esta velocidad compuesta crea ventajas competitivas que se vuelven prácticamente imposibles de alcanzar para organizaciones que operan bajo paradigmas tradicionales.
        </p>
      </div>
  }, {
    number: "3",
    title: "Asociación Humano-IA",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Contrario a narrativas populares sobre reemplazo tecnológico, el modelo AI-first se fundamenta en una asociación simbiótica entre inteligencia humana e inteligencia artificial. Esta colaboración no es una simple división de tareas, sino una integración profunda donde las fortalezas únicas de humanos y IA se amplifican mutuamente para crear capacidades que ninguna de las partes podría lograr independientemente.
        </p>

        <p className="text-gray-600 leading-relaxed">
          En esta nueva arquitectura organizacional, los seres humanos se especializan en actividades que requieren contexto emocional, juicio ético, creatividad estratégica y navegación de ambigüedad. Mientras tanto, los sistemas de IA asumen responsabilidades en procesamiento de información a gran escala, identificación de patrones complejos, automatización de decisiones rutinarias y optimización continua de procesos operativos.
        </p>
        
        <div className="space-y-4 my-8">
          <h5 className="font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            El Imperativo del Upskilling
          </h5>
          <p className="text-gray-600 leading-relaxed">
            Datos de investigación empresarial revelan que el 60% de las organizaciones planean implementar transformaciones AI significativas dentro de los próximos dos años. Sin embargo, el éxito de estas iniciativas depende críticamente de la capacidad de las empresas para reentrenar y reorientar a su fuerza laboral. El upskilling no es un complemento opcional; es un componente fundamental de la estrategia AI-first.
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            Las competencias más valoradas en organizaciones AI-first incluyen: prompt engineering y comunicación efectiva con sistemas de IA, interpretación y validación de outputs de IA en contextos específicos del dominio, diseño de workflows que integren capacidades humanas y de IA de manera óptima, y supervisión ética de sistemas autónomos o semi-autónomos.
          </p>
        </div>

        <h5 className="font-semibold text-gray-800 text-lg mb-4">Ejemplo de Implementación: OpenAI</h5>
        <p className="text-gray-600 leading-relaxed">
          OpenAI ha desarrollado un modelo ejemplar de colaboración humano-IA en sus propias operaciones. Sus equipos utilizan agentes de IA integrados en workflows de desarrollo, investigación y operaciones, donde los sistemas automatizados manejan tareas de análisis de código, documentación y testing preliminar, mientras que los investigadores humanos se enfocan en dirección estratégica, validación de resultados y decisiones arquitectónicas complejas. Esta división de responsabilidades ha resultado en mejoras de productividad documentadas del 40-60% según reportes en Forbes AI 50 (2025).
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h6 className="font-medium text-gray-800 mb-3">Modelo de Colaboración Óptima:</h6>
          <div className="flex items-center justify-between text-sm bg-white p-4 rounded border">
            <div className="text-center">
              <div className="bg-green-100 px-4 py-2 rounded font-medium text-green-800">Humanos</div>
              <p className="text-gray-600 mt-2">Estrategia • Ética • Creatividad</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <span>↔</span>
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 px-4 py-2 rounded font-medium text-blue-800">IA</div>
              <p className="text-gray-600 mt-2">Ejecución • Análisis • Optimización</p>
            </div>
          </div>
        </div>
      </div>
  }, {
    number: "4",
    title: "Diseño Nativo de IA y Gobernanza",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          El diseño nativo de IA representa un cambio paradigmático en cómo concebimos y construimos sistemas organizacionales. A diferencia de enfoques que intentan integrar IA en infraestructuras existentes, el diseño nativo reimagina completamente los procesos, interfaces y arquitecturas para optimizar la colaboración entre agentes inteligentes y usuarios humanos.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Este enfoque se caracteriza por interfaces dinámicas que se adaptan al contexto y preferencias del usuario en tiempo real, sistemas que aprenden y evolucionan continuamente sin intervención manual, y arquitecturas modulares que permiten la integración fluida de nuevas capacidades de IA a medida que emergen. El diseño nativo también enfatiza la transparencia y explicabilidad, asegurando que los usuarios puedan comprender y confiar en las decisiones tomadas por sistemas autónomos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Ejemplo: Antropic
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Anthropic lidera en diseños éticos que integran feedback humano directamente en loops de aprendizaje de IA. Sus sistemas incorporan mecanismos de corrección y refinamiento en tiempo real, permitiendo que los modelos se alineen continuamente con valores humanos y expectativas de comportamiento ético (The Software Report, 2025).
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-800">Principios de Gobernanza</h5>
            <p className="text-gray-600 leading-relaxed">
              La gobernanza AI-first requiere marcos de trabajo que balanceen innovación con responsabilidad. Esto incluye auditorías algorítmicas regulares, transparencia en procesos de toma de decisiones automatizadas, y protocolos claros para la intervención humana cuando es necesaria.
            </p>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8">
          <h5 className="font-semibold text-red-800 mb-3">Imperativo de Privacidad y Seguridad</h5>
          <p className="text-red-700 leading-relaxed">
            El 74% de las empresas identifican la protección de datos como su preocupación principal al implementar sistemas AI-first. Como señala el informe de Box: "Los agentes IA no pueden guardar secretos" - requieren marcos de gobernanza que aseguren que información sensible permanezca protegida mientras se maximiza la utilidad de los datos para entrenamiento y operación de IA.
          </p>
        </div>

        <h5 className="font-semibold text-gray-800 text-lg mb-4">Datos como Activo Estratégico</h5>
        <p className="text-gray-600 leading-relaxed">
          En organizaciones AI-first, los datos trascienden su rol tradicional como subproducto de operaciones para convertirse en el activo estratégico más valioso. Documentos no estructurados, contratos, comunicaciones internas, y otros tipos de información previamente "dormida" se activan como fuentes de insights y automatización.
        </p>
        
        <p className="text-gray-600 leading-relaxed">
          Scale AI, reconocida en la lista Forbes 2025, ha demostrado cómo el etiquetado y estructuración inteligente de datos puede generar valor exponencial. Sus clientes reportan capacidades transformadoras como análisis automático de miles de documentos en procesos de M&A, aceleración significativa del descubrimiento de fármacos mediante análisis de literatura científica, y procesamiento automático de contratos legales complejos con precisión superior al 95%.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h6 className="font-medium text-gray-800 mb-3">Casos de Uso de Valorización de Datos:</h6>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>M&A Due Diligence:</strong> Análisis de 10,000+ documentos en días en lugar de meses</li>
            <li>• <strong>Investigación Farmacéutica:</strong> Identificación de compuestos prometedores mediante análisis de literatura global</li>
            <li>• <strong>Procesamiento Legal:</strong> Automatización de revisión de contratos con precisión superior a métodos manuales</li>
            <li>• <strong>Inteligencia Competitiva:</strong> Monitoreo continuo de desarrollos de mercado a través de múltiples fuentes</li>
          </ul>
        </div>
      </div>
  }]
}, {
  phase: "Lecciones Históricas",
  phaseNumber: "02",
  chapters: [{
    number: "5",
    title: "Web-First: Quién lo Hizo Bien",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          La transición hacia paradigmas web-first en las décadas de 1990 y 2000 ofrece paralelos instructivos para comprender los desafíos y oportunidades de la transformación AI-first. Las empresas que exitosamente adoptaron estrategias web-first no simplemente agregaron presencia digital a sus operaciones existentes; reimaginaron fundamentalmente sus modelos de negocio, procesos operativos y relaciones con clientes alrededor de las posibilidades únicas que ofrecía Internet.
        </p>

        <p className="text-gray-600 leading-relaxed">
          El factor distintivo entre ganadores y perdedores en la era web-first no fue la velocidad de adopción tecnológica, sino la profundidad de la transformación organizacional. Las empresas exitosas entendieron que Internet no era simplemente un nuevo canal de distribución, sino un medio fundamentalmente diferente que requería nuevas competencias, culturas empresariales y métricas de éxito.
        </p>
        
        <CaseStudyGrid
          successCases={[
            { title: "Amazon (1994)", description: "Jeff Bezos reconoció que Internet permitía un modelo de retail fundamentalmente superior: inventario virtualmente ilimitado, personalización a escala, y recomendaciones basadas en datos. Amazon no intentó replicar las librerías físicas online; creó una experiencia de compra enteramente nueva que sólo era posible en el medio digital. Su enfoque en datos desde el primer día les permitió desarrollar sistemas de recomendación que revolucionaron el e-commerce y posteriormente expandirse hacia AWS, dominando la infraestructura cloud global.", type: 'success' },
            { title: "Netflix (2007)", description: "La transición de Netflix desde DVD por correo hacia streaming web-first demostró coraje estratégico extraordinario. Reed Hastings deliberadamente canibalizó su modelo de negocio existente exitoso para posicionarse en lo que correctamente predijo sería el futuro del entretenimiento. Su inversión temprana en algoritmos de recomendación y análisis de preferencias de audiencia les permitió crear contenido original altamente targeted, transformándolos de distribuidor a creador de contenido. De 1 millón de suscriptores en 2002 a más de 200 millones en 2025.", type: 'success' },
            { title: "Stripe", description: "Stripe ejemplifica el poder del diseño API-first (una variante del web-first). Los hermanos Collison entendieron que los pagos online requerían una infraestructura fundamentalmente diferente de los sistemas de pago tradicionales. Su enfoque en developer experience y simplicidad de integración les permitió escalar exponencialmente en la economía digital emergente, convirtiéndose en la infraestructura invisible que potencia miles de empresas online.", type: 'success' }
          ]}
          failureCases={[
            { title: "Borders", description: "Borders Books tenía ventajas significativas: marca reconocida, relaciones con publishers, y presencia física extensa. Sin embargo, subestimaron fundamentalmente la disrupción que representaba Amazon. En lugar de desarrollar capacidades e-commerce propias, externalizaron su presencia online a Amazon, esencialmente alimentando a su competidor más peligroso. Su quiebra en 2011 ilustra cómo ventajas tradicionales se vuelven irrelevantes cuando emerge un paradigma nuevo.", type: 'failure' },
            { title: "Blockbuster", description: "El caso Blockbuster es particularmente instructivo porque tuvieron múltiples oportunidades de adaptarse. Rechazaron la oferta de adquirir Netflix por $50 millones en 2000, y posteriormente lanzaron iniciativas de streaming que llegaron demasiado tarde y fueron mal ejecutadas. Su modelo de negocio estaba tan optimizado para rentas físicas y fees de retraso que no pudieron reimaginar una experiencia de entertainment digital nativa.", type: 'failure' },
                         { title: "General Electric (Digital)", description: "La iniciativa 'GE Digital' bajo Jeff Immelt representa un fracaso de $7 mil millones en transformación digital. A pesar de inversiones masivas, GE no logró desarrollar una cultura digital nativa ni repensar sus procesos industriales para la era conectada. Su incapacidad de integrar digital en su ADN operativo resultó en pérdidas significativas y eventual abandono de la iniciativa.", type: 'failure' }
          ]}
        />

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
          <h5 className="font-semibold text-blue-800 mb-3">Lecciones Clave para AI-First</h5>
          <p className="text-blue-700 leading-relaxed">
            <strong>Principio fundamental:</strong> El éxito en transiciones paradigmáticas requiere reimaginación total, no mejoras incrementales. Las empresas web-first exitosas no agregaron digital a sus operaciones existentes; reconstruyeron sus organizaciones alrededor de las posibilidades únicas del medio digital. La misma transformación fundamental es necesaria para el éxito AI-first.
          </p>
        </div>
      </div>
  }, {
    number: "6",
    title: "Mobile-First: Revolución Móvil",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          La transición mobile-first entre 2007-2015 aceleró y amplificó las lecciones de la era web-first. La introducción del iPhone y la proliferación de smartphones crearon no solo un nuevo dispositivo, sino un paradigma completamente nuevo de interacción humano-computadora. Las empresas mobile-first exitosas entendieron que los dispositivos móviles no eran simplemente computadoras pequeñas, sino plataformas para experiencias contextuales, personales e inmediatas que no tenían precedente en medios anteriores.
        </p>

        <p className="text-gray-600 leading-relaxed">
          El mobile-first también democratizó el acceso tecnológico de manera sin precedentes, especialmente en mercados emergentes donde los smartphones se convirtieron en el primer y único punto de acceso a servicios digitales. Esta democratización creó oportunidades para modelos de negocio enteramente nuevos que simplemente no existían en las eras de desktop o web tradicional.
        </p>
        
        <CaseStudyGrid
          successCases={[
            { title: "Uber (2009)", description: "Uber reimaginó completamente el transporte urbano al integrar GPS, pagos móviles, y matching de demanda/oferta en tiempo real. Su aplicación mobile-first no simplemente digitalizó taxis; creó un mercado de transporte completamente nuevo con dinámicas de precio, rating de drivers, y logística optimizada que solo era posible en mobile. Su valoración creció de startup a $70+ mil millones, demostrando el poder transformador del mobile-first.", type: 'success' },
            { title: "Instagram (2010)", description: "Instagram nació puramente mobile-first, optimizando para cámaras de smartphone y compartimiento instantáneo. Su enfoque en simplicidad visual y experiencia táctil intuitiva les permitió alcanzar 100 millones de usuarios en menos de 2 años, culminando en su adquisición por Facebook por $1 mil millón cuando tenía solo 13 empleados. Demostró cómo productos mobile-nativos pueden escalar exponencialmente con equipos lean.", type: 'success' },
            { title: "WhatsApp", description: "WhatsApp revolucionó comunicaciones globales al optimizar mensajería para conectividad móvil variable y costos de data limitados. Su enfoque en eficiencia técnica y experiencia de usuario universal les permitió escalar a 2+ mil millones de usuarios, especialmente en mercados emergentes donde se convirtió en infraestructura de comunicación esencial.", type: 'success' },
            { title: "Tesla Mobile (2025)", description: "Tesla integra mobile-first con IA para actualizaciones over-the-air, diagnósticos predictivos, y personalización del vehículo basada en patrones de uso. Su app móvil funciona como control center para toda la experiencia automotriz, desde pre-climatización hasta autopilot customizado.", type: 'success' }
          ]}
          failureCases={[
            { title: "BlackBerry", description: "BlackBerry dominaba smartphones empresariales pero falló en reconocer el shift hacia dispositivos táctiles consumer-friendly y ecosistemas de apps. Su insistencia en teclados físicos y resistencia al cambio hacia interfaces touch los llevó de líderes de mercado a irrelevancia en menos de 5 años, culminando en su salida del hardware en 2017.", type: 'failure' },
            { title: "Nokia", description: "Nokia poseía tecnología móvil superior y reconocimiento de marca global, pero subestimó la importancia de ecosistemas de software. Su alianza tardía con Windows Phone y resistencia a Android los excluyó de la revolución smartphone, resultando en la venta de su división móvil a Microsoft en 2013 por una fracción de su valor histórico.", type: 'failure' },
            { title: "Microsoft Mobile (Inicial)", description: "Steve Ballmer famously se burló del iPhone en 2007, subestimando fundamentalmente el appeal consumer de dispositivos touch. La entrada tardía de Microsoft al mercado mobile con Windows Phone llegó cuando iOS y Android ya habían establecido ecosistemas dominantes, resultando en fracaso comercial a pesar de inversiones significativas.", type: 'failure' },
            { title: "IBM Watson (Mobile)", description: "IBM prometió revolucionar healthcare y servicios con Watson mobile, pero subestimó la complejidad de implementación en contextos reales. Sus soluciones fallaron en delivered expected ROI, resultando en writeoffs significativos y pérdida de credibilidad en aplicaciones de IA enterprise.", type: 'failure' }
          ]}
        />

        <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
          <h4 className="font-semibold text-purple-800 mb-3">Paralelos Críticos con AI-First en 2025</h4>
          <p className="text-purple-700 leading-relaxed">
            Las lecciones mobile-first son especialmente relevantes para AI-first porque ambas transiciones involucran nuevas interfaces de interacción (touch vs. conversational/AI), democratización de capacidades avanzadas, y la necesidad de repensar completely user experiences. Empresas como World Labs (Forbes AI 50) están triunfando en AI-first al aplicar principios similares: construir nativamente para el nuevo paradigma en lugar de adaptar soluciones legacy.
          </p>
          
          <p className="text-purple-700 leading-relaxed mt-4">
            Simultáneamente, el 42% de proyectos AI fallan por razones similares a fracasos mobile-first: falta de data readiness (equivalente a falta de mobile-optimized content), gobernanza inadecuada (equivalente a poor app store optimization), y resistencia cultural a nuevos workflows (equivalente a resistencia a touch interfaces).
          </p>
        </div>
      </div>
  }]
}, {
  phase: "El Caso de Box",
  phaseNumber: "03",
  chapters: [{
    number: "7",
    title: "La Transformación de Box",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Box Inc. representa uno de los casos de estudio más comprehensivos y documentados de transformación AI-first en el sector enterprise. Como líder establecido en gestión de contenido inteligente y colaboración empresarial, Box enfrentó la decisión estratégica de evolucionar desde una plataforma de storage y sharing hacia una infraestructura de contenido potenciada por IA. Su CEO Aaron Levie y COO Olivia Nottebohm han sido particularmente transparentes sobre los desafíos, decisiones y resultados de esta transformación.
        </p>

        <p className="text-gray-600 leading-relaxed">
          La decisión de Box de volverse AI-first no fue impulsada por presión competitiva inmediata, sino por una visión estratégica sobre el futuro del trabajo empresarial. Levie argumenta que para empresas con vastas cantidades de datos no estructurados—documentos, contratos, comunicaciones, materials de marketing—la transformación AI-first no es simplemente una oportunidad de mejora; es un imperativo existencial que determina relevancia futura.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <div className="flex items-start gap-4">
            <ExternalLink className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-4">Recursos de Investigación Primaria</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://blog.box.com/ai-first" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline text-sm">
                  • Blog de Box sobre Estrategia AI-First
                </a>
                <a href="https://cloud.app.box.com/s/58461dcylju9f7g11c7f0getfnrvlwnc" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline text-sm">
                  • Informe Completo "Becoming an AI-first Company"
                </a>
                <a href="https://www.forbes.com/lists/ai50/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline text-sm">
                  • Forbes AI 50 - Análisis de Liderazgo
                </a>
                <a href="https://hbr.org/2025/06/the-ai-revolution-wont-happen-overnight" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline text-sm">
                  • Harvard Business Review - Perspectiva Académica
                </a>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800 text-lg mb-4">Principios Estratégicos Adoptados</h4>
        
        <p className="text-gray-600 leading-relaxed">
          La transformación de Box se fundamentó en cinco principios estratégicos que reflejan las mejores prácticas de organizaciones AI-first exitosas:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="space-y-4">
            <h5 className="font-medium text-gray-800">1. Expansión de Capacidades</h5>
            <p className="text-gray-600 leading-relaxed">
              Box desarrolló capacidades para automatizar campañas de marketing en 25+ idiomas simultáneamente, procesar contratos legales complejos a escala enterprise, y generar insights de business intelligence desde documentos no estructurados. Estas capacidades no existían en su stack tecnológico tradicional.
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium text-gray-800">2. Asociación Humano-IA Estratégica</h5>
            <p className="text-gray-600 leading-relaxed">
              Implementaron programas comprehensivos de upskilling mediante workshops hands-on, certificaciones internas en AI literacy, y rotaciones entre equipos para desarrollar fluency en collaboration humano-IA. 85% de sus empleados completaron training básico en AI tools.
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium text-gray-800">3. Diseño Nativo para Agentes</h5>
            <p className="text-gray-600 leading-relaxed">
              Rediseñaron interfaces de usuario para optimizar interactions con AI agents, implementaron APIs que permiten control programático de workflows empresariales, y desarrollaron sistemas de feedback que mejoran performance de IA mediante uso real.
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium text-gray-800">4. Gobernanza como Ventaja Competitiva</h5>
            <p className="text-gray-600 leading-relaxed">
              Establecieron frameworks de privacy-by-design, auditorías algorítmicas regulares, y transparency reports que les permitieron ganar confianza de enterprise clients preocupados por compliance y seguridad de datos.
            </p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800 text-lg mb-4">Pitfalls Estratégicos Evitados</h4>
        
        <p className="text-gray-600 leading-relaxed">
          Box evitó sistemáticamente las trampas más comunes en transformaciones AI-first: automatizar procesos existentes sin reimaginarlos (que resulta en mejoras marginales en lugar de transformation), subestimar los requisitos de data quality y infrastructure (que causan 60% de fracasos AI según su research), y falta de alineación organizacional entre leadership, IT, y business units (que resulta en initiatives fragmentadas sin impact real).
        </p>
        
        <p className="text-gray-600 leading-relaxed">
          Particularmente notable fue su decisión de invertir agresivamente en change management y cultural transformation parallel a technology deployment. Muchas organizaciones focus exclusively en technical capabilities mientras neglectan la preparación humana y organizacional necesaria para success AI-first.
        </p>
      </div>
  }, {
    number: "8",
    title: "Resultados y Ejemplos Internos",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Los resultados de la transformación AI-first de Box han sido documentados exhaustivamente, proporcionando evidence empírica rare en el landscape de transformation empresarial. Sus metrics de success incluyen tanto indicadores cuantitativos tradicionales como nuevas métricas específicas para organizations AI-first.
        </p>

        <div className="bg-green-50 border-l-4 border-green-400 p-6 my-8">
          <h4 className="font-semibold text-green-800 mb-4">Resultados Cuantitativos Destacados</h4>
          <div className="space-y-3">
            <p className="text-green-700">
              <strong>37% de improvement en productivity</strong> para equipos que adoptaron workflows AI-first, medido por output per hour y quality metrics
            </p>
            <p className="text-green-700">
              <strong>60% reduction en time-to-insight</strong> para análisis de business intelligence desde documentos enterprise
            </p>
            <p className="text-green-700">
              <strong>85% employee satisfaction</strong> con AI tools después de completar upskilling programs
            </p>
            <p className="text-green-700">
              <strong>$12M en cost savings</strong> anualizados desde automatización de processes routine
            </p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800 text-lg mb-4">Implementaciones Departamentales Específicas</h4>
        
        <p className="text-gray-600 leading-relaxed">
          La transformación de Box no fue un rollout uniforme across la organization, sino una series de pilots targeted en departments con highest potential impact y readiness for change:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Product & Engineering</h5>
            <p className="text-gray-600 leading-relaxed">
              Implementaron AI code analysis para identificar optimizations, automated testing generation, y predictive debugging que reduce resolution time en 45%. Sus AI systems analizan code commits para suggest improvements y identify potential security vulnerabilities before deployment.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Sales & Business Development</h5>
            <p className="text-gray-600 leading-relaxed">
              Automatización de RFP responses ahorra 2+ horas por documento, AI-powered lead scoring improved conversion rates en 28%, y automated competitive analysis provides real-time market intelligence para sales conversations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Customer Support</h5>
            <p className="text-gray-600 leading-relaxed">
              AI-powered ticket routing y automated resolution para common issues redujo resolution time en 30%, mientras sentiment analysis helps identify escalation risks before customers become frustrated.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Marketing & Content</h5>
            <p className="text-gray-600 leading-relaxed">
              Content generation for multiple markets duplicó marketing output sin aumentar headcount, AI-optimized campaign targeting improved ROI en 40%, y automated A/B testing accelerated optimization cycles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Legal & Compliance</h5>
            <p className="text-gray-600 leading-relaxed">
              Contract analysis automation reduces review time desde weeks a hours, automated compliance monitoring ensures regulatory adherence, y AI-powered legal research accelerates case preparation significantly.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-3">Human Resources</h5>
            <p className="text-gray-600 leading-relaxed">
              Resume screening automation improved hiring efficiency en 50%, AI-powered performance analysis provides objective insights for reviews, y predictive analytics help identify retention risks early.
            </p>
          </div>
        </div>

        <h4 className="font-semibold text-gray-800 text-lg mb-4">Modelo de Madurez AI-First</h4>
        
        <p className="text-gray-600 leading-relaxed">
          Box desarrolló un framework de 5 etapas para medir y guiar organizational maturity en AI adoption. Este modelo ha sido adoptado por otras enterprise organizations como benchmark para sus propias transformations:
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg my-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold flex-shrink-0">1</div>
              <div>
                <h5 className="font-semibold text-blue-800">Etapa Básica: Retrieval e Insights</h5>
                <p className="text-blue-700 text-sm">AI assists con basic information retrieval y pattern identification desde data estructurada. Focus en efficiency gains en tasks routine.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-blue-800 font-bold flex-shrink-0">2</div>
              <div>
                <h5 className="font-semibold text-blue-800">Workflows Predefinidos</h5>
                <p className="text-blue-700 text-sm">AI ejecuta processes standardized con human oversight. Introduction de decision automation en contexts well-defined.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
              <div>
                <h5 className="font-semibold text-blue-800">Colaboración Inter-Sistemas</h5>
                <p className="text-blue-700 text-sm">Multiple AI systems collaborate entre sí mientras humans oversee strategic decisions. Complex orchestration de AI agents.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
              <div>
                <h5 className="font-semibold text-blue-800">Auto-Mejora Limitada</h5>
                <p className="text-blue-700 text-sm">AI systems self-improve with minimal human intervention, learning desde real-world usage y optimizing performance continuously.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
              <div>
                <h5 className="font-semibold text-blue-800">Autonomía Estratégica</h5>
                <p className="text-blue-700 text-sm">AI manages complete business functions mientras humans set strategic vision y ethical guidelines. Full AI-first operation.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Box reporta que están operating en Etapa 3 para la mayoría de functions, con pilots en Etapa 4 para specific use cases. Su journey desde Etapa 1 hasta current state tomó approximately 18 months de focused transformation effort.
        </p>
      </div>
  }]
}, {
  phase: "Sugerencias Prácticas",
  phaseNumber: "04",
  chapters: [{
    number: "9",
    title: "Liderazgo e Infraestructura",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Las recomendaciones prácticas para implementar estrategias AI-first emergen desde el análisis de Box, lecciones históricas de transformations web-first y mobile-first, y best practices identificadas por leading consulting firms como BCG, a16z, y research de LinkedIn sobre organizational change. Estas sugerencias priorizan iteración controlled, alineación organizacional, y framework ethical como foundations para success sostenible.
        </p>

        <p className="text-gray-600 leading-relaxed">
          La transformación AI-first no es un technology deployment project; es un organizational change initiative que requires sustained leadership commitment, cultural evolution, y significant investment en human capital development. Success depends más en change management effectiveness que en technical sophistication de AI tools.
        </p>
        
        <div className="space-y-8 my-8">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
            <h4 className="font-semibold text-purple-800 mb-4">1. Nombramiento de Liderazgo y Celebración de Innovación</h4>
            
            <p className="text-purple-700 leading-relaxed mb-4">
              La primera y más crítica decisión es establecer clear accountability para AI transformation a través de leadership roles específicos. Esto no puede ser responsibilities adicionales para existing executives; requires dedicated focus y authority.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-2 border-purple-300">
                <h5 className="font-medium text-purple-800">Designar AI Transformation Lead</h5>
                <p className="text-purple-700 text-sm">Role hybrid que spans IT, HR, y Operations. Debe tener business acumen, technical literacy, y change management experience. Authority para make decisions cross-functionally.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-purple-300">
                <h5 className="font-medium text-purple-800">Ensure Leadership AI Fluency</h5>
                <p className="text-purple-700 text-sm">C-suite debe completar AI literacy training. No pueden lead transformation efectiva sin understanding fundamental de capabilities y limitations de AI technologies.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-purple-300">
                <h5 className="font-medium text-purple-808">Celebrar Early Adopters</h5>
                <p className="text-purple-700 text-sm">Recognition programs para employees que contribute to AI initiatives. Visibility y rewards para experimentation successful. Culture shift requires positive reinforcement.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h4 className="font-semibold text-blue-800 mb-4">2. Inversión en Infraestructura Segura y Escalable</h4>
            
            <p className="text-blue-700 leading-relaxed mb-4">
              Technical foundation debe ser designed para interoperability y scale desde el beginning. Avoid vendor lock-in y ensure flexibility para evolving AI landscape.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-2 border-blue-300">
                <h5 className="font-medium text-blue-800">Interoperabilidad de Modelos</h5>
                <p className="text-blue-700 text-sm">APIs que work con OpenAI, Anthropic, Google, y other leading providers. Avoid dependency en single AI vendor. Enable model switching based en performance y cost.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-blue-300">
                <h5 className="font-medium text-blue-800">Platform Integration</h5>
                <p className="text-blue-700 text-sm">Integration con existing enterprise platforms como Box AI, Salesforce, Microsoft 365. Leverage current data y workflows en lugar de rebuild desde scratch.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-blue-300">
                <h5 className="font-medium text-blue-800">Data Foundation</h5>
                <p className="text-blue-700 text-sm">Invest en data quality, governance, y accessibility. AI effectiveness is limited by data quality. Strong data foundation is prerequisite para AI success.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6">
            <h4 className="font-semibold text-green-800 mb-4">3. Desarrollo de Políticas Éticas Proactivas</h4>
            
            <p className="text-green-700 leading-relaxed mb-4">
              Ethical frameworks debe ser established early en transformation process. Easier to build ethical considerations into systems desde beginning que retrofit later.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-2 border-green-300">
                <h5 className="font-medium text-green-800">Privacy by Design</h5>
                <p className="text-green-700 text-sm">Data privacy y user consent integrated into AI systems desde architecture level. Compliance con GDPR, CCPA, y other regulations as baseline.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-green-300">
                <h5 className="font-medium text-green-800">Algorithmic Transparency</h5>
                <p className="text-green-700 text-sm">Explainability requirements para AI decisions que impact humans. Clear documentation de how AI systems make decisions y when human intervention is required.</p>
              </div>
              
              <div className="bg-white p-4 rounded border-l-2 border-green-300">
                <h5 className="font-medium text-green-800">Regular Policy Review</h5>
                <p className="text-green-700 text-sm">Quarterly reviews de ethical guidelines as AI capabilities evolve. Adaptive policies que evolve con technology landscape y societal expectations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enlaces de referencia actualizados */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Research y Referencias Clave
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a 
              href="https://media-publications.bcg.com/BCG-Executive-Perspectives-AI-First-Companies-Win-the-Future-Issue1-10June2025.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 underline text-sm flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              BCG: AI-First Companies Win the Future
            </a>
            <a 
              href="https://hbr.org/2025/06/the-ai-revolution-wont-happen-overnight" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 underline text-sm flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              HBR: The AI Revolution Won't Happen Overnight
            </a>
            <a 
              href="https://blog.box.com/ai-first" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 underline text-sm flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Box: AI-First Strategy Blog
            </a>
            <a 
              href="https://www.forbes.com/lists/ai50/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 underline text-sm flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Forbes AI 50 Leading Companies
            </a>
          </div>
        </div>
      </div>
  }, {
    number: "10",
    title: "Desarrollo y Implementación",
    content: <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          La fase de desarrollo e implementación representa el transition desde strategic planning hacia operational execution. Esta phase determines el success o failure de AI-first transformation porque aquí es donde organizational theory meets practical reality de daily operations, employee resistance, y technical challenges.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Evidence desde multiple case studies sugiere que organizations più successful implement AI-first strategies using phased approaches que balance ambition con pragmatism, allowing para learning y adjustment as capabilities mature y cultural acceptance grows.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div className="space-y-6">
            <h4 className="font-semibold text-amber-800 text-lg">4. Upskilling Comprehensivo de Workforce</h4>
            
            <p className="text-gray-600 leading-relaxed">
              Workforce transformation is arguably la component più critical y challenging de AI-first adoption. Success requires systematic approach to developing AI literacy across toda la organization, no just technical teams.
            </p>
            
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded border-l-2 border-amber-300">
                <h5 className="font-medium text-amber-800">Training en Prompt Engineering</h5>
                <p className="text-amber-700 text-sm">Comprehensive programs que teach employees how to communicate effectively con AI systems. Include best practices para different AI tools y use cases specific a their roles.</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded border-l-2 border-amber-300">
                <h5 className="font-medium text-amber-800">"AI Days" Regulares</h5>
                <p className="text-amber-700 text-sm">Monthly hands-on sessions donde employees experiment con new AI tools, share successes y failures, y learn desde each other's experiences.</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded border-l-2 border-amber-300">
                <h5 className="font-medium text-amber-800">Bibliotecas de Prompts</h5>
                <p className="text-amber-700 text-sm">Curated repositories de effective prompts para common business tasks. Enable knowledge sharing y accelerate adoption across teams.</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded border-l-2 border-amber-300">
                <h5 className="font-medium text-amber-800">Experimentación Descentralizada</h5>
                <p className="text-amber-700 text-sm">Encourage teams to pilot AI tools in their specific contexts con minimal approval processes. Innovation often emerges desde grassroots experimentation.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-red-800 text-lg">5. Desarrollo de Workflows de Alto Impacto</h4>
            
            <p className="text-gray-600 leading-relaxed">
              Strategic selection de initial AI implementations determines momentum y credibility for broader transformation. Focus en high-visibility, high-impact use cases that demonstrate clear ROI.
            </p>
            
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded border-l-2 border-red-300">
                <h5 className="font-medium text-red-800">Framework 2x2 para Priorización</h5>
                <p className="text-red-700 text-sm">Matrix de Impact vs. Feasibility para evaluate AI use cases. Prioritize high-impact, high-feasibility projects first para build momentum.</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded border-l-2 border-red-300">
                <h5 className="font-medium text-red-800">Approach Foundational → Transformacional</h5>
                <p className="text-red-700 text-sm">Start con foundational capabilities (automation, insights) before moving a transformational uses (autonomous agents, creative generation).</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded border-l-2 border-red-300">
                <h5 className="font-medium text-red-800">Pilots Estratégicos</h5>
                <p className="text-red-700 text-sm">Select pilot projects que have executive sponsorship, clear success metrics, y potential para scale across organization if successful.</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded border-l-2 border-red-300">
                <h5 className="font-medium text-red-800">ROI Measurement Constante</h5>
                <p className="text-red-700 text-sm">Establish baseline metrics before AI implementation y track improvements consistently. Data-driven evidence builds support para expanded initiatives.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
          <h4 className="font-semibold text-blue-800 mb-4">6. Measurement y Change Management</h4>
          
          <p className="text-blue-700 leading-relaxed mb-4">
            Systematic measurement y proactive change management are essential para maintaining momentum y addressing resistance that inevitably emerges durante organizational transformation.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border-l-2 border-blue-300">
              <h5 className="font-medium text-blue-800">Evaluación de Madurez</h5>
              <p className="text-blue-700 text-sm">Use Box's 5-stage maturity model para assess current state y plan progression. Regular assessments help identify gaps y prioritize investments.</p>
            </div>
            
            <div className="bg-white p-4 rounded border-l-2 border-blue-300">
              <h5 className="font-medium text-blue-800">Focus en Innovation Metrics</h5>
              <p className="text-blue-700 text-sm">Track innovation velocity, employee engagement con AI tools, y business impact metrics além de traditional efficiency measures.</p>
            </div>
            
            <div className="bg-white p-4 rounded border-l-2 border-blue-300">
              <h5 className="font-medium text-blue-800">Comunicación Proactiva</h5>
              <p className="text-blue-700 text-sm">Regular communication sobre AI initiatives, successes, y learnings. Address concerns y resistance through transparent dialogue y education.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4">7. Learning desde Antecedentes Históricos</h4>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Apply lessons desde web-first y mobile-first transformations: reimagine complete processes en lugar de simply automate existing ones, implement "AI budgets" que are fungible y can be reallocated based en learning, y adopt iterative mindset como Amazon y Uber en lugar de attempting "Big Bang" transformations.
          </p>
          
          <div className="bg-white p-4 rounded border border-gray-200">
            <h5 className="font-medium text-gray-800 mb-2">Principio Fundamental</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              Para 2025, integrate AI agents como core workforce components en lugar de treating them como tools. Plan organizational structures que assume human-AI collaboration as default operating mode.
            </p>
          </div>
        </div>
      </div>
  }]
}];

const AIFirstContent = () => {
  const [activeChapter, setActiveChapter] = useState("1");
  
  useEffect(() => {
    // Asegurar que empezamos desde el principio
    window.scrollTo(0, 0);
    
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0.3
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapterNumber = entry.target.id.replace('chapter-', '');
          setActiveChapter(chapterNumber);

          // Dispatch custom event to update sidebar
          window.dispatchEvent(new CustomEvent('activeChapterChange', {
            detail: { activeChapter: chapterNumber }
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Pequeño delay para asegurar que el DOM está listo
    setTimeout(() => {
      const chapterElements = document.querySelectorAll('[id^="chapter-"]');
      chapterElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI-First: Un playbook para empresas modernas</h1>
            <p className="text-gray-600 mt-2">Una guía exhaustiva para la transformación empresarial en la era de la IA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Publicado en Enero 2025</span>
          <span>•</span>
          <span>20 min de lectura</span>
          <span>•</span>
          <span>4 capítulos</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-16">
        {contentData.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="space-y-12">
            {/* Phase Header */}
            <div className="border-l-4 border-gray-900 pl-6">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{phase.phase}</h2>
              </div>
            </div>

            {/* Chapters */}
            <div className="space-y-12">
              {phase.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} id={`chapter-${chapter.number}`} className="scroll-mt-20">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {chapter.number}. {chapter.title}
                    </h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {chapter.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Conclusión */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Conclusión</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Convertirse en AI-first en 2025 es una jornada transformadora que promete ventajas exponenciales. Siguiendo este playbook, inspirado en Box y lecciones históricas, empresas pueden evitar fallos y liderar en la nueva era.
        </p>
        <div className="bg-white p-4 rounded border-l-4 border-blue-400 mb-6">
          <p className="text-blue-700 font-medium">
            Recuerda: es reimaginación, no automatización. Consulta pilots y actualiza estrategias continuamente.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Más contenido próximamente</h4>
          <p className="text-gray-600 mb-4">
            Estamos trabajando en guías adicionales que cubren temas avanzados, casos de uso específicos y técnicas expertas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://www.anlak.es" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-md transition-colors"
            >
              Visitar ANLAK
            </a>
            <a 
              href="https://discord.gg/XydCRXyDPE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              Únete al Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFirstContent; 