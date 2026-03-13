import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'core-java',
    name: 'Core Java',
    order: 1,
    topics: [
      { id: 'syntax-basics', name: 'Синтаксис и основы', categoryId: 'core-java' },
      { id: 'oop', name: 'ООП (классы, интерфейсы, наследование)', categoryId: 'core-java' },
      { id: 'exceptions', name: 'Исключения и обработка ошибок', categoryId: 'core-java' },
      { id: 'generics', name: 'Generics', categoryId: 'core-java' },
      { id: 'collections', name: 'Коллекции (List, Set, Map)', categoryId: 'core-java' },
      { id: 'stream-api', name: 'Stream API', categoryId: 'core-java' },
      { id: 'optional', name: 'Optional', categoryId: 'core-java' },
      { id: 'lambdas', name: 'Lambda-выражения', categoryId: 'core-java' },
    ],
  },
  {
    id: 'concurrency',
    name: 'Concurrency',
    order: 2,
    topics: [
      { id: 'threads', name: 'Потоки (Thread, Runnable)', categoryId: 'concurrency' },
      { id: 'synchronization', name: 'Синхронизация (synchronized, locks)', categoryId: 'concurrency' },
      { id: 'executors', name: 'Executors и пулы потоков', categoryId: 'concurrency' },
      { id: 'concurrent-collections', name: 'Concurrent коллекции', categoryId: 'concurrency' },
      { id: 'completable-future', name: 'CompletableFuture', categoryId: 'concurrency' },
      { id: 'atomic', name: 'Atomic переменные', categoryId: 'concurrency' },
    ],
  },
  {
    id: 'jvm-memory',
    name: 'JVM & Memory',
    order: 3,
    topics: [
      { id: 'jvm-architecture', name: 'Архитектура JVM', categoryId: 'jvm-memory' },
      { id: 'memory-model', name: 'Модель памяти Java', categoryId: 'jvm-memory' },
      { id: 'garbage-collection', name: 'Сборка мусора (GC)', categoryId: 'jvm-memory' },
      { id: 'gc-types', name: 'Типы GC (G1, ZGC, Shenandoah)', categoryId: 'jvm-memory' },
      { id: 'profiling', name: 'Профилирование и мониторинг', categoryId: 'jvm-memory' },
      { id: 'class-loading', name: 'Загрузка классов', categoryId: 'jvm-memory' },
    ],
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    order: 4,
    topics: [
      { id: 'spring-core', name: 'Spring Core (IoC, DI)', categoryId: 'frameworks' },
      { id: 'spring-boot', name: 'Spring Boot', categoryId: 'frameworks' },
      { id: 'spring-mvc', name: 'Spring MVC / REST', categoryId: 'frameworks' },
      { id: 'spring-data', name: 'Spring Data JPA', categoryId: 'frameworks' },
      { id: 'spring-security', name: 'Spring Security', categoryId: 'frameworks' },
      { id: 'hibernate', name: 'Hibernate / JPA', categoryId: 'frameworks' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    order: 5,
    topics: [
      { id: 'sql-basics', name: 'SQL основы', categoryId: 'databases' },
      { id: 'jdbc', name: 'JDBC', categoryId: 'databases' },
      { id: 'transactions', name: 'Транзакции и ACID', categoryId: 'databases' },
      { id: 'connection-pooling', name: 'Connection Pooling', categoryId: 'databases' },
      { id: 'indexes', name: 'Индексы и оптимизация', categoryId: 'databases' },
      { id: 'nosql', name: 'NoSQL (Redis, MongoDB)', categoryId: 'databases' },
    ],
  },
  {
    id: 'tools-practices',
    name: 'Tools & Practices',
    order: 6,
    topics: [
      { id: 'git', name: 'Git и версионирование', categoryId: 'tools-practices' },
      { id: 'maven-gradle', name: 'Maven / Gradle', categoryId: 'tools-practices' },
      { id: 'unit-testing', name: 'Unit-тестирование (JUnit, Mockito)', categoryId: 'tools-practices' },
      { id: 'integration-testing', name: 'Интеграционное тестирование', categoryId: 'tools-practices' },
      { id: 'docker', name: 'Docker', categoryId: 'tools-practices' },
      { id: 'ci-cd', name: 'CI/CD', categoryId: 'tools-practices' },
    ],
  },
];
