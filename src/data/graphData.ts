import type { Node, Edge } from 'reactflow';

export interface TopicNodeData {
  label: string;
  type: 'root' | 'category' | 'topic' | 'subtopic';
  topicId?: string;
}

// Root node
const rootNode: Node<TopicNodeData> = {
  id: 'java',
  type: 'topicNode',
  position: { x: 400, y: 0 },
  data: { label: 'Java Developer', type: 'root' },
};

// Category nodes (20 topics from topics-draft.md)
const categoryNodes: Node<TopicNodeData>[] = [
  // Left column
  { id: 'databases', type: 'topicNode', position: { x: 0, y: 120 }, data: { label: 'Базы данных / SQL', type: 'category' } },
  { id: 'collections', type: 'topicNode', position: { x: 0, y: 240 }, data: { label: 'Коллекции', type: 'category' } },
  { id: 'hashmap', type: 'topicNode', position: { x: 0, y: 360 }, data: { label: 'HashMap / equals / hashCode', type: 'category' } },
  { id: 'docker-k8s', type: 'topicNode', position: { x: 0, y: 480 }, data: { label: 'Docker / Kubernetes', type: 'category' } },
  { id: 'kafka', type: 'topicNode', position: { x: 0, y: 600 }, data: { label: 'Kafka', type: 'category' } },
  { id: 'patterns', type: 'topicNode', position: { x: 0, y: 720 }, data: { label: 'Паттерны проектирования', type: 'category' } },
  { id: 'memory-gc', type: 'topicNode', position: { x: 0, y: 840 }, data: { label: 'Память и GC', type: 'category' } },

  // Center column
  { id: 'spring', type: 'topicNode', position: { x: 400, y: 180 }, data: { label: 'Spring / Spring Boot', type: 'category' } },
  { id: 'rest-http', type: 'topicNode', position: { x: 400, y: 300 }, data: { label: 'REST / HTTP', type: 'category' } },
  { id: 'exceptions', type: 'topicNode', position: { x: 400, y: 420 }, data: { label: 'Исключения', type: 'category' } },
  { id: 'stream-api', type: 'topicNode', position: { x: 400, y: 540 }, data: { label: 'Stream API', type: 'category' } },
  { id: 'concurrency', type: 'topicNode', position: { x: 400, y: 660 }, data: { label: 'Многопоточность', type: 'category' } },
  { id: 'transactions', type: 'topicNode', position: { x: 400, y: 780 }, data: { label: 'Транзакции', type: 'category' } },

  // Right column
  { id: 'string', type: 'topicNode', position: { x: 800, y: 120 }, data: { label: 'String', type: 'category' } },
  { id: 'immutability', type: 'topicNode', position: { x: 800, y: 240 }, data: { label: 'Иммутабельность', type: 'category' } },
  { id: 'hibernate', type: 'topicNode', position: { x: 800, y: 360 }, data: { label: 'Hibernate / JPA', type: 'category' } },
  { id: 'microservices', type: 'topicNode', position: { x: 800, y: 480 }, data: { label: 'Микросервисы', type: 'category' } },
  { id: 'oop-solid', type: 'topicNode', position: { x: 800, y: 600 }, data: { label: 'ООП и SOLID', type: 'category' } },
  { id: 'completable-future', type: 'topicNode', position: { x: 800, y: 720 }, data: { label: 'CompletableFuture', type: 'category' } },
  { id: 'generics-records', type: 'topicNode', position: { x: 800, y: 840 }, data: { label: 'Generics и Records', type: 'category' } },
];

// Edges connecting nodes
const rootEdges: Edge[] = [
  // Root to categories
  { id: 'e-java-databases', source: 'java', target: 'databases', type: 'smoothstep' },
  { id: 'e-java-collections', source: 'java', target: 'collections', type: 'smoothstep' },
  { id: 'e-java-hashmap', source: 'java', target: 'hashmap', type: 'smoothstep' },
  { id: 'e-java-docker', source: 'java', target: 'docker-k8s', type: 'smoothstep' },
  { id: 'e-java-kafka', source: 'java', target: 'kafka', type: 'smoothstep' },
  { id: 'e-java-patterns', source: 'java', target: 'patterns', type: 'smoothstep' },
  { id: 'e-java-memory', source: 'java', target: 'memory-gc', type: 'smoothstep' },
  { id: 'e-java-spring', source: 'java', target: 'spring', type: 'smoothstep' },
  { id: 'e-java-rest', source: 'java', target: 'rest-http', type: 'smoothstep' },
  { id: 'e-java-exceptions', source: 'java', target: 'exceptions', type: 'smoothstep' },
  { id: 'e-java-stream', source: 'java', target: 'stream-api', type: 'smoothstep' },
  { id: 'e-java-concurrency', source: 'java', target: 'concurrency', type: 'smoothstep' },
  { id: 'e-java-transactions', source: 'java', target: 'transactions', type: 'smoothstep' },
  { id: 'e-java-string', source: 'java', target: 'string', type: 'smoothstep' },
  { id: 'e-java-immutability', source: 'java', target: 'immutability', type: 'smoothstep' },
  { id: 'e-java-hibernate', source: 'java', target: 'hibernate', type: 'smoothstep' },
  { id: 'e-java-microservices', source: 'java', target: 'microservices', type: 'smoothstep' },
  { id: 'e-java-oop', source: 'java', target: 'oop-solid', type: 'smoothstep' },
  { id: 'e-java-cf', source: 'java', target: 'completable-future', type: 'smoothstep' },
  { id: 'e-java-generics', source: 'java', target: 'generics-records', type: 'smoothstep' },
];

export const initialNodes: Node<TopicNodeData>[] = [
  rootNode,
  ...categoryNodes,
];

export const initialEdges: Edge[] = [
  ...rootEdges,
];

// Topic data with subtopics for expanding
export interface TopicWithSubtopics {
  id: string;
  name: string;
  subtopics: Array<{
    id: string;
    name: string;
    items?: Array<{ id: string; name: string }>;
  }>;
}

export const TOPICS_DATA: TopicWithSubtopics[] = [
  {
    id: 'databases',
    name: 'Базы данных / SQL / PostgreSQL',
    subtopics: [
      { id: 'db-indexes', name: 'Индексы', items: [
        { id: 'db-btree', name: 'B-tree' },
        { id: 'db-composite-index', name: 'Составной индекс' },
        { id: 'db-cardinality', name: 'Кардинальность' },
      ]},
      { id: 'db-join', name: 'JOIN', items: [
        { id: 'db-inner-join', name: 'INNER JOIN' },
        { id: 'db-left-join', name: 'LEFT JOIN' },
        { id: 'db-subquery', name: 'Подзапросы' },
        { id: 'db-correlated', name: 'Коррелированный подзапрос' },
      ]},
      { id: 'db-grouping', name: 'Группировка', items: [
        { id: 'db-where-having', name: 'WHERE vs HAVING' },
        { id: 'db-group-by', name: 'GROUP BY' },
      ]},
      { id: 'db-window', name: 'Оконные функции', items: [
        { id: 'db-row-number', name: 'ROW_NUMBER()' },
        { id: 'db-rank', name: 'RANK()' },
        { id: 'db-dense-rank', name: 'DENSE_RANK()' },
      ]},
      { id: 'db-postgres', name: 'PostgreSQL', items: [
        { id: 'db-mvcc', name: 'MVCC' },
        { id: 'db-vacuum', name: 'VACUUM' },
        { id: 'db-analyze', name: 'ANALYZE' },
        { id: 'db-explain', name: 'EXPLAIN' },
      ]},
    ],
  },
  {
    id: 'collections',
    name: 'Коллекции',
    subtopics: [
      { id: 'col-list', name: 'List', items: [
        { id: 'col-arraylist', name: 'ArrayList' },
        { id: 'col-linkedlist', name: 'LinkedList' },
        { id: 'col-al-vs-ll', name: 'ArrayList vs LinkedList' },
        { id: 'col-vector', name: 'Vector' },
        { id: 'col-stack', name: 'Stack' },
      ]},
      { id: 'col-set', name: 'Set', items: [
        { id: 'col-hashset', name: 'HashSet' },
        { id: 'col-linkedhashset', name: 'LinkedHashSet' },
        { id: 'col-treeset', name: 'TreeSet' },
      ]},
      { id: 'col-queue', name: 'Queue', items: [
        { id: 'col-queue-base', name: 'Queue' },
        { id: 'col-deque', name: 'Deque' },
        { id: 'col-priorityqueue', name: 'PriorityQueue' },
      ]},
      { id: 'col-map', name: 'Map', items: [
        { id: 'col-hashmap', name: 'HashMap' },
        { id: 'col-linkedhashmap', name: 'LinkedHashMap' },
        { id: 'col-treemap', name: 'TreeMap' },
        { id: 'col-weakhashmap', name: 'WeakHashMap' },
      ]},
      { id: 'col-concurrent', name: 'Concurrent', items: [
        { id: 'col-concurrenthashmap', name: 'ConcurrentHashMap' },
        { id: 'col-copyonwritearraylist', name: 'CopyOnWriteArrayList' },
        { id: 'col-synchronized', name: 'Synchronized коллекции' },
      ]},
      { id: 'col-iterators', name: 'Итераторы', items: [
        { id: 'col-iterator', name: 'Iterator' },
        { id: 'col-listiterator', name: 'ListIterator' },
        { id: 'col-failfast', name: 'Fail-fast vs fail-safe' },
        { id: 'col-cme', name: 'ConcurrentModificationException' },
      ]},
      { id: 'col-sorting', name: 'Сортировка', items: [
        { id: 'col-comparable', name: 'Comparable' },
        { id: 'col-comparator', name: 'Comparator' },
      ]},
    ],
  },
  {
    id: 'hashmap',
    name: 'HashMap / equals / hashCode',
    subtopics: [
      { id: 'hm-internals', name: 'Устройство HashMap', items: [
        { id: 'hm-buckets', name: 'Buckets' },
        { id: 'hm-collisions', name: 'Коллизии' },
        { id: 'hm-treeify', name: 'Treeification (8+ элементов)' },
      ]},
      { id: 'hm-contract', name: 'Контракт equals/hashCode', items: [
        { id: 'hm-equals-hashcode', name: 'equals() и hashCode()' },
      ]},
      { id: 'hm-keys', name: 'Ключи', items: [
        { id: 'hm-mutable-key', name: 'Мутабельный ключ' },
        { id: 'hm-string-key', name: 'String как ключ' },
        { id: 'hm-key-requirements', name: 'Требования к ключу' },
      ]},
      { id: 'hm-performance', name: 'Производительность', items: [
        { id: 'hm-load-factor', name: 'Load factor' },
        { id: 'hm-capacity', name: 'Capacity' },
        { id: 'hm-rehashing', name: 'Rehashing' },
      ]},
      { id: 'hm-threading', name: 'Многопоточность', items: [
        { id: 'hm-vs-hashtable', name: 'HashMap vs Hashtable' },
        { id: 'hm-null', name: 'null ключ/значение' },
      ]},
    ],
  },
  {
    id: 'docker-k8s',
    name: 'Docker / Kubernetes',
    subtopics: [
      { id: 'dk-docker', name: 'Docker', items: [
        { id: 'dk-container-vm', name: 'Контейнер vs VM' },
        { id: 'dk-dockerfile', name: 'Dockerfile' },
        { id: 'dk-cmd-entrypoint', name: 'CMD vs ENTRYPOINT' },
        { id: 'dk-multistage', name: 'Multi-stage build' },
        { id: 'dk-compose', name: 'Docker Compose' },
      ]},
      { id: 'dk-k8s', name: 'Kubernetes', items: [
        { id: 'dk-pod', name: 'Pod' },
        { id: 'dk-node', name: 'Node' },
        { id: 'dk-service', name: 'Service (ClusterIP, NodePort, LoadBalancer)' },
        { id: 'dk-replicaset', name: 'ReplicaSet' },
        { id: 'dk-statefulset', name: 'StatefulSet' },
      ]},
      { id: 'dk-scaling', name: 'Масштабирование', items: [
        { id: 'dk-hpa', name: 'HorizontalPodAutoscaler' },
        { id: 'dk-rolling', name: 'Rolling update' },
      ]},
      { id: 'dk-config', name: 'Конфигурация', items: [
        { id: 'dk-configmap', name: 'ConfigMap' },
        { id: 'dk-secret', name: 'Secret' },
        { id: 'dk-liveness', name: 'Liveness probe' },
        { id: 'dk-readiness', name: 'Readiness probe' },
      ]},
      { id: 'dk-network', name: 'Сеть', items: [
        { id: 'dk-ingress', name: 'Ingress' },
        { id: 'dk-namespace', name: 'Namespace' },
      ]},
    ],
  },
  {
    id: 'kafka',
    name: 'Kafka',
    subtopics: [
      { id: 'kf-topics', name: 'Топики', items: [
        { id: 'kf-topic', name: 'Topic' },
        { id: 'kf-partition', name: 'Partition' },
        { id: 'kf-message-key', name: 'Ключ сообщения' },
      ]},
      { id: 'kf-consumer', name: 'Consumer', items: [
        { id: 'kf-consumer-group', name: 'Consumer Group' },
        { id: 'kf-rebalancing', name: 'Rebalancing' },
        { id: 'kf-consumer-lag', name: 'Consumer lag' },
      ]},
      { id: 'kf-delivery', name: 'Гарантии доставки', items: [
        { id: 'kf-at-most-once', name: 'at-most-once' },
        { id: 'kf-at-least-once', name: 'at-least-once' },
        { id: 'kf-exactly-once', name: 'exactly-once' },
      ]},
      { id: 'kf-offset', name: 'Offset', items: [
        { id: 'kf-offset-base', name: 'Offset' },
        { id: 'kf-commit', name: 'Auto commit vs manual commit' },
      ]},
      { id: 'kf-replication', name: 'Репликация', items: [
        { id: 'kf-leader-follower', name: 'Leader / Follower' },
        { id: 'kf-isr', name: 'ISR (In-Sync Replicas)' },
      ]},
      { id: 'kf-producer', name: 'Producer', items: [
        { id: 'kf-acks', name: 'acks (0, 1, all)' },
        { id: 'kf-batching', name: 'Batching' },
        { id: 'kf-idempotent', name: 'Idempotent producer' },
      ]},
      { id: 'kf-errors', name: 'Ошибки', items: [
        { id: 'kf-dlq', name: 'DLQ (Dead Letter Queue)' },
        { id: 'kf-retention', name: 'Retention policy' },
      ]},
    ],
  },
  {
    id: 'patterns',
    name: 'Паттерны проектирования',
    subtopics: [
      { id: 'pt-creational', name: 'Порождающие', items: [
        { id: 'pt-singleton', name: 'Singleton' },
        { id: 'pt-singleton-ts', name: 'Thread-safe Singleton' },
        { id: 'pt-dcl', name: 'Double-checked locking' },
        { id: 'pt-factory', name: 'Factory Method' },
        { id: 'pt-abstract-factory', name: 'Abstract Factory' },
        { id: 'pt-builder', name: 'Builder' },
        { id: 'pt-prototype', name: 'Prototype' },
      ]},
      { id: 'pt-structural', name: 'Структурные', items: [
        { id: 'pt-decorator', name: 'Decorator' },
        { id: 'pt-proxy', name: 'Proxy' },
      ]},
      { id: 'pt-behavioral', name: 'Поведенческие', items: [
        { id: 'pt-strategy', name: 'Strategy' },
        { id: 'pt-observer', name: 'Observer' },
        { id: 'pt-state', name: 'State' },
        { id: 'pt-iterator', name: 'Iterator' },
      ]},
      { id: 'pt-anti', name: 'Антипаттерны', items: [
        { id: 'pt-god-object', name: 'God Object' },
        { id: 'pt-spaghetti', name: 'Spaghetti Code' },
      ]},
    ],
  },
  {
    id: 'memory-gc',
    name: 'Память и GC',
    subtopics: [
      { id: 'gc-memory', name: 'Области памяти', items: [
        { id: 'gc-heap-stack', name: 'Heap vs Stack' },
        { id: 'gc-young', name: 'Young Generation' },
        { id: 'gc-old', name: 'Old Generation (Tenured)' },
        { id: 'gc-metaspace', name: 'Metaspace' },
      ]},
      { id: 'gc-collectors', name: 'Сборщики мусора', items: [
        { id: 'gc-g1', name: 'G1 GC' },
        { id: 'gc-zgc', name: 'ZGC' },
        { id: 'gc-shenandoah', name: 'Shenandoah' },
      ]},
      { id: 'gc-mechanics', name: 'Механизмы GC', items: [
        { id: 'gc-stw', name: 'Stop-the-world' },
        { id: 'gc-roots', name: 'GC roots' },
        { id: 'gc-reachability', name: 'Reachability' },
      ]},
      { id: 'gc-problems', name: 'Проблемы', items: [
        { id: 'gc-memory-leak', name: 'Memory leak' },
        { id: 'gc-oom', name: 'OutOfMemoryError' },
        { id: 'gc-oom-types', name: 'Типы OOM' },
      ]},
      { id: 'gc-tools', name: 'Инструменты', items: [
        { id: 'gc-heap-dump', name: 'Heap dump' },
        { id: 'gc-xms-xmx', name: '-Xms / -Xmx' },
        { id: 'gc-system-gc', name: 'System.gc()' },
      ]},
    ],
  },
  {
    id: 'spring',
    name: 'Spring / Spring Boot',
    subtopics: [
      { id: 'sp-di', name: 'Dependency Injection', items: [
        { id: 'sp-constructor', name: 'Constructor injection' },
        { id: 'sp-setter', name: 'Setter injection' },
        { id: 'sp-field', name: 'Field injection' },
      ]},
      { id: 'sp-bean', name: 'Bean', items: [
        { id: 'sp-lifecycle', name: 'Bean lifecycle' },
        { id: 'sp-postconstruct', name: '@PostConstruct / @PreDestroy' },
        { id: 'sp-bpp', name: 'BeanPostProcessor' },
        { id: 'sp-scope', name: 'Scope (singleton, prototype)' },
      ]},
      { id: 'sp-proxy', name: 'Прокси и AOP', items: [
        { id: 'sp-spring-proxy', name: 'Spring Proxy' },
        { id: 'sp-aop', name: 'AOP' },
        { id: 'sp-aop-terms', name: 'Aspect, Advice, Pointcut, Join point' },
      ]},
      { id: 'sp-tx', name: '@Transactional', items: [
        { id: 'sp-transactional', name: '@Transactional' },
        { id: 'sp-self-invocation', name: 'Self-invocation проблема' },
      ]},
      { id: 'sp-config', name: 'Конфигурация', items: [
        { id: 'sp-boot-app', name: '@SpringBootApplication' },
        { id: 'sp-autoconfig', name: 'Auto-configuration' },
        { id: 'sp-starters', name: 'Starters' },
        { id: 'sp-componentscan', name: '@ComponentScan' },
        { id: 'sp-profiles', name: 'Profiles' },
      ]},
      { id: 'sp-annotations', name: 'Аннотации', items: [
        { id: 'sp-component', name: '@Component' },
        { id: 'sp-service', name: '@Service' },
        { id: 'sp-repository', name: '@Repository' },
        { id: 'sp-controller', name: '@Controller' },
        { id: 'sp-autowired', name: '@Autowired' },
        { id: 'sp-qualifier', name: '@Qualifier' },
      ]},
    ],
  },
  {
    id: 'rest-http',
    name: 'REST / HTTP',
    subtopics: [
      { id: 'rh-methods', name: 'HTTP методы', items: [
        { id: 'rh-get', name: 'GET' },
        { id: 'rh-post', name: 'POST' },
        { id: 'rh-put', name: 'PUT' },
        { id: 'rh-patch', name: 'PATCH' },
        { id: 'rh-delete', name: 'DELETE' },
      ]},
      { id: 'rh-idempotency', name: 'Идемпотентность', items: [
        { id: 'rh-idempotent-methods', name: 'Идемпотентные методы' },
        { id: 'rh-post-not-idempotent', name: 'POST не идемпотентен' },
      ]},
      { id: 'rh-status', name: 'Статус коды', items: [
        { id: 'rh-status-codes', name: '2xx, 3xx, 4xx, 5xx' },
        { id: 'rh-401-403', name: '401 vs 403' },
      ]},
      { id: 'rh-design', name: 'REST дизайн', items: [
        { id: 'rh-stateless', name: 'Stateless' },
        { id: 'rh-naming', name: 'Именование endpoints' },
        { id: 'rh-hateoas', name: 'HATEOAS' },
        { id: 'rh-versioning', name: 'Версионирование API' },
      ]},
      { id: 'rh-headers', name: 'Headers', items: [
        { id: 'rh-content-type', name: 'Content-Type' },
        { id: 'rh-accept', name: 'Accept' },
      ]},
    ],
  },
  {
    id: 'exceptions',
    name: 'Исключения',
    subtopics: [
      { id: 'ex-types', name: 'Типы', items: [
        { id: 'ex-checked-unchecked', name: 'Checked vs Unchecked' },
        { id: 'ex-error-exception', name: 'Error vs Exception' },
        { id: 'ex-throwable', name: 'Throwable' },
      ]},
      { id: 'ex-handling', name: 'Обработка', items: [
        { id: 'ex-try-catch', name: 'try-catch-finally' },
        { id: 'ex-try-with', name: 'try-with-resources' },
        { id: 'ex-autocloseable', name: 'AutoCloseable' },
        { id: 'ex-multicatch', name: 'Multi-catch' },
      ]},
      { id: 'ex-custom', name: 'Кастомные исключения', items: [
        { id: 'ex-extend-exception', name: 'Наследование от Exception' },
        { id: 'ex-extend-runtime', name: 'Наследование от RuntimeException' },
      ]},
      { id: 'ex-practices', name: 'Практики', items: [
        { id: 'ex-stacktrace', name: 'Stack trace' },
        { id: 'ex-chaining', name: 'Exception chaining' },
        { id: 'ex-suppressed', name: 'Suppressed exceptions' },
        { id: 'ex-logging', name: 'Логирование исключений' },
      ]},
    ],
  },
  {
    id: 'stream-api',
    name: 'Stream API',
    subtopics: [
      { id: 'sa-operations', name: 'Операции', items: [
        { id: 'sa-intermediate-terminal', name: 'Intermediate vs Terminal' },
        { id: 'sa-filter', name: 'filter()' },
        { id: 'sa-map', name: 'map()' },
        { id: 'sa-flatmap', name: 'flatMap()' },
        { id: 'sa-collect', name: 'collect()' },
        { id: 'sa-reduce', name: 'reduce()' },
      ]},
      { id: 'sa-collectors', name: 'Collectors', items: [
        { id: 'sa-tolist', name: 'toList()' },
        { id: 'sa-tomap', name: 'toMap()' },
        { id: 'sa-groupingby', name: 'groupingBy()' },
      ]},
      { id: 'sa-lazy', name: 'Lazy evaluation', items: [
        { id: 'sa-lazy-eval', name: 'Ленивые вычисления' },
        { id: 'sa-short-circuit', name: 'Short-circuiting' },
      ]},
      { id: 'sa-parallel', name: 'Parallel Streams', items: [
        { id: 'sa-parallel-op', name: 'parallel()' },
        { id: 'sa-forkjoin', name: 'ForkJoinPool' },
        { id: 'sa-side-effects', name: 'Side effects' },
      ]},
      { id: 'sa-search', name: 'Поиск', items: [
        { id: 'sa-findfirst', name: 'findFirst()' },
        { id: 'sa-findany', name: 'findAny()' },
        { id: 'sa-match', name: 'anyMatch() / allMatch() / noneMatch()' },
      ]},
    ],
  },
  {
    id: 'concurrency',
    name: 'Многопоточность',
    subtopics: [
      { id: 'mt-sync', name: 'Синхронизация', items: [
        { id: 'mt-synchronized', name: 'synchronized' },
        { id: 'mt-volatile', name: 'volatile' },
        { id: 'mt-happens-before', name: 'happens-before' },
        { id: 'mt-monitor', name: 'Monitor' },
      ]},
      { id: 'mt-locks', name: 'Locks', items: [
        { id: 'mt-reentrantlock', name: 'ReentrantLock' },
        { id: 'mt-deadlock', name: 'Deadlock' },
        { id: 'mt-race-condition', name: 'Race condition' },
      ]},
      { id: 'mt-atomic', name: 'Atomic', items: [
        { id: 'mt-atomicinteger', name: 'AtomicInteger' },
        { id: 'mt-atomiclong', name: 'AtomicLong' },
        { id: 'mt-cas', name: 'CAS (Compare-And-Swap)' },
      ]},
      { id: 'mt-pools', name: 'Thread Pools', items: [
        { id: 'mt-executor', name: 'ExecutorService' },
        { id: 'mt-fixed', name: 'FixedThreadPool' },
        { id: 'mt-cached', name: 'CachedThreadPool' },
        { id: 'mt-forkjoin', name: 'ForkJoinPool' },
      ]},
      { id: 'mt-new', name: 'Новые возможности', items: [
        { id: 'mt-virtual', name: 'Virtual Threads (Java 21)' },
        { id: 'mt-structured', name: 'Structured Concurrency' },
      ]},
      { id: 'mt-basics', name: 'Базовые классы', items: [
        { id: 'mt-thread-runnable', name: 'Thread vs Runnable' },
        { id: 'mt-callable', name: 'Callable' },
        { id: 'mt-future', name: 'Future' },
      ]},
    ],
  },
  {
    id: 'transactions',
    name: 'Транзакции',
    subtopics: [
      { id: 'tx-acid', name: 'ACID', items: [
        { id: 'tx-atomicity', name: 'Atomicity' },
        { id: 'tx-consistency', name: 'Consistency' },
        { id: 'tx-isolation', name: 'Isolation' },
        { id: 'tx-durability', name: 'Durability' },
      ]},
      { id: 'tx-levels', name: 'Уровни изоляции', items: [
        { id: 'tx-read-uncommitted', name: 'Read Uncommitted' },
        { id: 'tx-read-committed', name: 'Read Committed' },
        { id: 'tx-repeatable-read', name: 'Repeatable Read' },
        { id: 'tx-serializable', name: 'Serializable' },
      ]},
      { id: 'tx-anomalies', name: 'Аномалии', items: [
        { id: 'tx-dirty-read', name: 'Dirty Read' },
        { id: 'tx-non-repeatable', name: 'Non-Repeatable Read' },
        { id: 'tx-phantom', name: 'Phantom Read' },
        { id: 'tx-lost-update', name: 'Lost Update' },
      ]},
      { id: 'tx-spring', name: 'Spring', items: [
        { id: 'tx-transactional', name: '@Transactional' },
        { id: 'tx-propagation', name: 'Propagation (REQUIRED, REQUIRES_NEW, NESTED)' },
        { id: 'tx-rollback', name: 'Rollback' },
        { id: 'tx-readonly', name: 'readOnly' },
      ]},
    ],
  },
  {
    id: 'string',
    name: 'String',
    subtopics: [
      { id: 'str-pool', name: 'String Pool', items: [
        { id: 'str-pool-base', name: 'String Pool' },
        { id: 'str-intern', name: 'intern()' },
        { id: 'str-literal-vs-new', name: 'Литерал vs new String()' },
      ]},
      { id: 'str-immutable', name: 'Иммутабельность', items: [
        { id: 'str-why-immutable', name: 'Почему immutable' },
        { id: 'str-equals', name: '== vs equals()' },
      ]},
      { id: 'str-builder', name: 'StringBuilder / StringBuffer', items: [
        { id: 'str-stringbuilder', name: 'StringBuilder' },
        { id: 'str-stringbuffer', name: 'StringBuffer' },
        { id: 'str-concat', name: 'Конкатенация через +' },
      ]},
      { id: 'str-methods', name: 'Методы', items: [
        { id: 'str-substring', name: 'substring()' },
        { id: 'str-split', name: 'split()' },
        { id: 'str-replace', name: 'replace() vs replaceAll()' },
      ]},
      { id: 'str-memory', name: 'Память', items: [
        { id: 'str-compact', name: 'Compact Strings (Java 9+)' },
        { id: 'str-dedup', name: 'String deduplication (G1)' },
      ]},
    ],
  },
  {
    id: 'immutability',
    name: 'Иммутабельность',
    subtopics: [
      { id: 'im-create', name: 'Создание immutable класса', items: [
        { id: 'im-final-class', name: 'final класс' },
        { id: 'im-final-fields', name: 'final поля' },
        { id: 'im-defensive', name: 'Defensive copy' },
        { id: 'im-no-setters', name: 'Без сеттеров' },
      ]},
      { id: 'im-copy', name: 'Копирование', items: [
        { id: 'im-shallow', name: 'Shallow copy' },
        { id: 'im-deep', name: 'Deep copy' },
      ]},
      { id: 'im-collections', name: 'Коллекции', items: [
        { id: 'im-unmodifiable', name: 'Collections.unmodifiableList()' },
        { id: 'im-of', name: 'List.of() / Set.of() / Map.of()' },
      ]},
      { id: 'im-examples', name: 'Примеры', items: [
        { id: 'im-string', name: 'String' },
        { id: 'im-localdate', name: 'LocalDate / LocalDateTime' },
        { id: 'im-record', name: 'Record' },
      ]},
      { id: 'im-benefits', name: 'Преимущества', items: [
        { id: 'im-thread-safety', name: 'Thread-safety' },
        { id: 'im-caching', name: 'Кэширование' },
        { id: 'im-hashmap-keys', name: 'HashMap ключи' },
      ]},
    ],
  },
  {
    id: 'hibernate',
    name: 'Hibernate / JPA',
    subtopics: [
      { id: 'hb-n1', name: 'N+1 проблема', items: [
        { id: 'hb-n1-queries', name: 'N+1 запросов' },
        { id: 'hb-join-fetch', name: 'JOIN FETCH' },
        { id: 'hb-batchsize', name: '@BatchSize' },
      ]},
      { id: 'hb-loading', name: 'Загрузка', items: [
        { id: 'hb-lazy-eager', name: 'Lazy vs Eager' },
        { id: 'hb-lazy-init', name: 'LazyInitializationException' },
        { id: 'hb-fetch-strategies', name: 'Fetch strategies' },
      ]},
      { id: 'hb-lifecycle', name: 'Entity Lifecycle', items: [
        { id: 'hb-transient', name: 'Transient' },
        { id: 'hb-persistent', name: 'Persistent' },
        { id: 'hb-detached', name: 'Detached' },
        { id: 'hb-removed', name: 'Removed' },
      ]},
      { id: 'hb-cache', name: 'Кэширование', items: [
        { id: 'hb-l1-cache', name: 'First-level cache' },
        { id: 'hb-l2-cache', name: 'Second-level cache' },
        { id: 'hb-dirty-checking', name: 'Dirty checking' },
      ]},
      { id: 'hb-operations', name: 'Операции', items: [
        { id: 'hb-persist-merge', name: 'persist() vs merge()' },
        { id: 'hb-flush', name: 'flush()' },
        { id: 'hb-refresh', name: 'refresh()' },
      ]},
      { id: 'hb-locking', name: 'Блокировки', items: [
        { id: 'hb-optimistic', name: 'Optimistic locking (@Version)' },
        { id: 'hb-pessimistic', name: 'Pessimistic locking' },
      ]},
      { id: 'hb-relations', name: 'Связи', items: [
        { id: 'hb-onetomany', name: '@OneToMany / @ManyToOne' },
        { id: 'hb-cascade', name: 'Cascade types' },
        { id: 'hb-orphan', name: 'orphanRemoval' },
        { id: 'hb-bidirectional', name: 'Bidirectional relationships' },
      ]},
      { id: 'hb-queries', name: 'Запросы', items: [
        { id: 'hb-jpql', name: 'JPQL' },
        { id: 'hb-criteria', name: 'Criteria API' },
        { id: 'hb-projection', name: 'Projection' },
      ]},
    ],
  },
  {
    id: 'microservices',
    name: 'Микросервисы',
    subtopics: [
      { id: 'ms-patterns', name: 'Паттерны', items: [
        { id: 'ms-saga', name: 'Saga (хореография / оркестрация)' },
        { id: 'ms-circuit-breaker', name: 'Circuit Breaker' },
        { id: 'ms-bulkhead', name: 'Bulkhead' },
        { id: 'ms-retry', name: 'Retry' },
        { id: 'ms-backoff', name: 'Exponential backoff' },
      ]},
      { id: 'ms-infra', name: 'Инфраструктура', items: [
        { id: 'ms-discovery', name: 'Service Discovery' },
        { id: 'ms-gateway', name: 'API Gateway' },
        { id: 'ms-tracing', name: 'Distributed Tracing' },
      ]},
      { id: 'ms-data', name: 'Данные', items: [
        { id: 'ms-db-per-service', name: 'Database per Service' },
        { id: 'ms-sharding', name: 'Шардирование' },
        { id: 'ms-partitioning', name: 'Партиционирование' },
      ]},
      { id: 'ms-communication', name: 'Коммуникация', items: [
        { id: 'ms-sync-async', name: 'Синхронная vs асинхронная' },
        { id: 'ms-compensating', name: 'Компенсирующие транзакции' },
      ]},
      { id: 'ms-resilience', name: 'Отказоустойчивость', items: [
        { id: 'ms-strangler', name: 'Strangler Fig' },
        { id: 'ms-horizontal', name: 'Горизонтальное масштабирование' },
      ]},
    ],
  },
  {
    id: 'oop-solid',
    name: 'ООП и SOLID',
    subtopics: [
      { id: 'os-solid', name: 'SOLID', items: [
        { id: 'os-srp', name: 'Single Responsibility (SRP)' },
        { id: 'os-ocp', name: 'Open/Closed (OCP)' },
        { id: 'os-lsp', name: 'Liskov Substitution (LSP)' },
        { id: 'os-isp', name: 'Interface Segregation (ISP)' },
        { id: 'os-dip', name: 'Dependency Inversion (DIP)' },
      ]},
      { id: 'os-oop', name: 'ООП принципы', items: [
        { id: 'os-composition', name: 'Композиция vs Наследование' },
        { id: 'os-delegation', name: 'Делегирование' },
        { id: 'os-demeter', name: 'Law of Demeter' },
      ]},
      { id: 'os-cohesion', name: 'Cohesion', items: [
        { id: 'os-high-cohesion', name: 'High cohesion' },
        { id: 'os-low-coupling', name: 'Low coupling' },
      ]},
    ],
  },
  {
    id: 'completable-future',
    name: 'CompletableFuture',
    subtopics: [
      { id: 'cf-create', name: 'Создание', items: [
        { id: 'cf-supplyasync', name: 'supplyAsync()' },
        { id: 'cf-completed', name: 'completedFuture()' },
        { id: 'cf-future-vs-cf', name: 'Future vs CompletableFuture' },
      ]},
      { id: 'cf-chain', name: 'Цепочки', items: [
        { id: 'cf-thenapply', name: 'thenApply()' },
        { id: 'cf-thencompose', name: 'thenCompose()' },
        { id: 'cf-thenaccept', name: 'thenAccept()' },
        { id: 'cf-thenrun', name: 'thenRun()' },
      ]},
      { id: 'cf-combine', name: 'Комбинирование', items: [
        { id: 'cf-thencombine', name: 'thenCombine()' },
        { id: 'cf-allof', name: 'allOf()' },
        { id: 'cf-anyof', name: 'anyOf()' },
      ]},
      { id: 'cf-errors', name: 'Обработка ошибок', items: [
        { id: 'cf-exceptionally', name: 'exceptionally()' },
        { id: 'cf-handle', name: 'handle()' },
        { id: 'cf-whencomplete', name: 'whenComplete()' },
      ]},
      { id: 'cf-async', name: 'Async', items: [
        { id: 'cf-thenapplyasync', name: 'thenApplyAsync()' },
        { id: 'cf-custom-executor', name: 'Custom Executor' },
        { id: 'cf-commonpool', name: 'ForkJoinPool.commonPool()' },
      ]},
      { id: 'cf-control', name: 'Управление', items: [
        { id: 'cf-join-get', name: 'join() vs get()' },
        { id: 'cf-ortimeout', name: 'orTimeout()' },
        { id: 'cf-cancel', name: 'cancel()' },
      ]},
    ],
  },
  {
    id: 'generics-records',
    name: 'Generics и Records',
    subtopics: [
      { id: 'gr-generics', name: 'Generics', items: [
        { id: 'gr-erasure', name: 'Type erasure' },
        { id: 'gr-bounded', name: 'Bounded types (<T extends Number>)' },
        { id: 'gr-wildcards', name: 'Wildcards (?, extends, super)' },
        { id: 'gr-pecs', name: 'PECS' },
      ]},
      { id: 'gr-features', name: 'Особенности', items: [
        { id: 'gr-raw', name: 'Raw types' },
        { id: 'gr-bridge', name: 'Bridge methods' },
        { id: 'gr-multiple-bounds', name: 'Множественные bounds' },
      ]},
      { id: 'gr-records', name: 'Records', items: [
        { id: 'gr-record', name: 'Record' },
        { id: 'gr-compact-constructor', name: 'Компактный конструктор' },
        { id: 'gr-record-limits', name: 'Ограничения Record' },
        { id: 'gr-record-hashmap', name: 'Record как ключ HashMap' },
      ]},
    ],
  },
];
