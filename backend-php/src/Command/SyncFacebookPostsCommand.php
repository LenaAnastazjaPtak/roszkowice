<?php

declare(strict_types=1);

namespace App\Command;

use App\Service\Facebook\FacebookSyncService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:sync-facebook-posts',
    description: 'Imports new Facebook Page posts into the blog.',
)]
final class SyncFacebookPostsCommand extends Command
{
    public function __construct(
        private readonly FacebookSyncService $facebookSyncService,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        try {
            $result = $this->facebookSyncService->sync();
        } catch (\Throwable $exception) {
            $io->error($exception->getMessage());

            return Command::FAILURE;
        }

        $io->success(sprintf(
            'Synchronizacja zakończona. Nowe posty: %d, pominięte: %d.',
            $result['imported'],
            $result['skipped'],
        ));

        return Command::SUCCESS;
    }
}
