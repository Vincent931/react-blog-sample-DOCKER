<?php
namespace App\Controller;

use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
class ApiController extends AbstractController
{
    public function __construct(private readonly EntityManagerInterface $em)
    {}

    #[Route('/posts', name:'api.posts', methods:['GET'])]
    public function getPosts():JsonResponse
    {
        $posts=$this->em->getRepository(Post::class)->findAllDesc();

        return $this->json($posts, 200, [], ['groups'=>'posts.show']);
    }
} 